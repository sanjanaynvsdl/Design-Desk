import { atom, atomFamily, selector, selectorFamily } from "recoil";
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

//get-all orders of admin.
export const ordersAtom = atom<orderTypes[]>({
    key:'Orders',
    default:selector({
        key:'ordersSelector',
        get:async()=>{
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

//todo: after writng the update functionality.
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
        get:(id:string) => async()=>{
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
        get:(id:string)=> async()=>{
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



