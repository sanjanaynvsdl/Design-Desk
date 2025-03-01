import {atom, atomFamily, selector, selectorFamily} from 'recoil';
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


//get-all-customer data
export const customersAtom = atom<CustomerDetailedTypes[]>({
    key:'customersAtom',
    default:selector<CustomerDetailedTypes[]>({
        key:'customersSelector',
        get:async()=>{
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
        get:(id:string)=> async()=>{
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

