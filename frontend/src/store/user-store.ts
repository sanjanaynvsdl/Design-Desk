import { selector, atom } from "recoil";
import { axiosInstance } from "../utils/api/axios-instance";


interface UserTypes {
    _id: string,
    name: string,
    email: string,
    phoneNo: string,
    role: string,
    createdAt:string,
    updatedAt: string,
    __v: 0
}
export const userAtom = atom<UserTypes>({
    key:'UserAtom',
    default: selector<UserTypes>({
        key:"userSelector",
        get:async()=>{
            try {
                const respponse =await axiosInstance.get("/auth/me");
                console.log(respponse.data);
                return respponse.data.user;
                
            } catch (error:any) {
                console.error(`Error, failed to load admin data! ${error}`);
                throw new Error(error.response?.data?.message || "Failed to load admin data!")
                
            }
        }
    })
})