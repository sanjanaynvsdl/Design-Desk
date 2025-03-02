import {atom, atomFamily, selector, selectorFamily, useRecoilValue, useSetRecoilState} from 'recoil';
import { axiosInstance } from '../utils/api/axios-instance';


export interface CustomerDetailedTypes {
    _id:string,
    name:string,
    phoneNo:string,
    email:string,
    place:string,
    adminId:string,
    createdAt:string,
    updatedAt:string,
    __v:number

}


//refresh atom, when-ever customer data is updated/deleted call this.
export const refreshCustomerAtom = atom({
    key:'refreshCustomerAtom',
    default:0,
});

//refresh single customer 
export const  refreshSingleCustomerAtomFam = atomFamily({
    key:'refreshSingleCustomerAtomFam',
    default:0
});




//get-all-customer data
export const customersAtom = atom<CustomerDetailedTypes[]>({
    key:'customersAtom',
    default:selector<CustomerDetailedTypes[]>({
        key:'customersSelector',
        get:async({get})=>{

            get(refreshCustomerAtom);

            try {
                const response = await axiosInstance.get("/customer/");
                console.log(response.data);
                return response.data.customer;
            } catch (error:any) {
                console.error(`Error to retrive customers ${error}`);
                throw new Error(error.response?.data?.message || "Failed to load customers");
            }
        }
    })
});


//dynamically render, a customer with the given Id,
export const customerAtomFamily = atomFamily<CustomerDetailedTypes, string>({
    key:'CustomerAtomFamily',
    default:selectorFamily<CustomerDetailedTypes,string>({
        key:'CustomerSelectorFamily',
        get:(id:string)=> async({get})=>{

          
           get(refreshCustomerAtom);
           get(refreshSingleCustomerAtomFam(id));
            console.log(`SIngle customer data changed!`); 

            try {
                const response = await axiosInstance.get(`/customer/${id}`);
                console.log(response.data);
                return response.data.customerData;
            } catch (error:any) {
                console.error(`Error in getting customer data ${error}`);
                throw new Error(error.response.data?.message || "Failed to load customer data");
            }
        }
    })
});



//hook to call refrsh atom or update
export const useRefreshAllCustomers = ()=>{
    const setRefreshCustomerAtom = useSetRecoilState(refreshCustomerAtom);

    return ()=>{
        setRefreshCustomerAtom(prev=>prev+1);
    }
}


//hhook, to update/fetch singel customer datta
export const useRefreshSingleCustomer = (id:string)=>{
const setRefreshAtomFam = useSetRecoilState(refreshSingleCustomerAtomFam(id));
const refreshValue = useRecoilValue(refreshSingleCustomerAtomFam(id));

console.log(`The refreshed value is ` +refreshValue);
    return ()=>{
        setRefreshAtomFam(prev =>prev+1);
    }
}

