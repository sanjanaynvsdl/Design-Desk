import { atom, atomFamily, selector, selectorFamily, useRecoilState, useSetRecoilState } from "recoil";
import { axiosInstance } from "../utils/api/axios-instance";
import {CustomerDetailedTypes} from "./customers-store";


 export interface orderTypes {
    _id:string,
    customerId:CustomerTypes,
    ordersData: OrderDataTypes[],
    totalAmount:number,
    orderStatus:string,
    description:string,
    deliveryDate: string,
    paymentStatus:string,
    adminId:string,
    createdAt:string,
    updatedAt:string,
}


interface CustomerTypes {
    _id:string,
    name:string,
    phoneNo:string,
    email:string,
    place:string,
    updatedAt: string;
}

interface OrderDataTypes {
    title:string,
    quantity:number,
    unitPrice:number,
    totalPrice:number,
    _id:string,
}

interface OrderHistoryTypes {
    message:string,
    customerDetails:CustomerDetailedTypes,
    orders:orderTypes[],
}

//atom, returns contents, which has 3-states
//in-case of errors, throw new Error sets the hasError (state) in ordersAtom
/*
* contents.state == "loading"
* contents.state == "hasError"
* contents (contains data)
*/


//-----------------------------------------------------------------------------------------------------------------
//to dynamically render UI, when-ever update,delete,or new order is being added
//use, refresh token,
/*
1. Create refresh atom/atomFamily as per requirement.
2. use this in the selector
3. A hook to update the count of this.
4. use this hook after update/delete/post calls
5. As we call hook  -> updates atom -> this change will call specifc selector where-ever atom is being used
*/
//--------------------------------------------------------------------------------------------------------------


//refresh when-only one order changes (so atom-family)
export const orderRefershAtomFam = atomFamily({
    key:'orderRefreshTriggerAtomFamily',
    default:0
});

//refresh-all orders on delete/add/update
export const ordersRefreshAtom = atom({
    key:'ordersRefereshAtom',
    default:0,
});



//get-all orders of admin.
export const ordersAtom = atom<orderTypes[]>({
    key:'Orders',
    default:selector({
        key:'ordersSelector',
        get:async({get})=>{

            get(ordersRefreshAtom); 

            try {
                const response = await axiosInstance.get("/order/");
                console.log(response.data);
                return response.data.orders;
            } catch (error:any) {
                console.error(`Error in fetching orders ${error}`);
                throw new Error(error.response?.data?.message || "Failed to load orders, Please try again!")
            }
        }
    })
});


//pending-orders [Home-Page] derived from ordersAtom 
export const pendingOrders = selector<orderTypes[]>({
    key:'pending-orders',
    get:({get})=>{
        const currOrders = get(ordersAtom);
        const filteredOrders = currOrders.filter((order)=>order.orderStatus=="Pending");
        return filteredOrders;
    }
});

//render particular order, with id [using - atom-family, selector family].
//atomFamily expectes two types, restype and parameter(id) type <T,P>
export const orderAtomFam = atomFamily<orderTypes, string>({
    key:'orderAtomFamily',
    default:selectorFamily<orderTypes, string>({
        key:'orderSelectorFamily',
        get:(id:string) =>async({get})=>{

            get(orderRefershAtomFam(id));  //call-for specific id
            get(ordersRefreshAtom);  //get-all orders again.


            try {
                const response = await axiosInstance.get(`/order/${id}`);
                console.log(response.data);
                return response.data.order;
            } catch (error:any) {
                console.error(`Error in fetching the ${id} order - ${error}`);
                throw new Error(error.response?.data?.message || "Failed to load order data, Please try again!")
            }
        }
    })
});


//get-order-history of a customer[id]
export const orderHistoryAtomFam = atomFamily<OrderHistoryTypes, string>({
    key:'OrderHistoryAtomFam',
    default:selectorFamily<OrderHistoryTypes, string>({
        key:'OrderHistorySelectoryFam',
        get:(id:string)=> async({get})=>{

            get(ordersRefreshAtom);
            try {
                const response = await axiosInstance.get(`/order/customer/${id}`);
                console.log(response.data);
                //{data - message, customerDetails, orders[]}
                return response.data;   
            } catch (error:any) {
                console.error(`Error while loading customer order history ${error}`);
                throw new Error(error.response?.data?.message || "Failed to load customer order history!");
                
            }
        }
    })
});



//hook to refresh order with [id]
export const useRefreshOrder = (id:string)=> {
    const setRefreshTrigger = useSetRecoilState(orderRefershAtomFam(id));
    return ()=>{
        console.log(`Refreshing individual order ${id}`);
        setRefreshTrigger(prev=> prev+1);
    }
}

//hook to re-fresh all ordes
export const useRefreshAllOrders = ()=>{
    const setAllOrderAtom = useSetRecoilState(ordersRefreshAtom);

    return()=>{
        setAllOrderAtom(prev=>prev+1);
    }
}


