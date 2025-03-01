import { selector,atom, atomFamily, selectorFamily } from "recoil";
import { axiosInstance } from "../utils/api/axios-instance";

export interface WorkerTypes {
  _id: string;
  name: string;
  email: string;
  phoneNo: string;
  place: string;
  description: string;
  joinDate: string;
  workData: workDataType[]
  adminId: string,
  __v:string
}

interface workDataType{
    date:string,
    work:string,
    amount:string,
    _id:string,
}

interface WorkerViewDataTypes{

}


//get-all workers
export const workersAtom = atom<WorkerTypes[]>({
  key: "WorkersAtom",
  default: selector<WorkerTypes[]>({
    key: "WorkersSeclector",
    get: async () => {
      try {
        const response = await axiosInstance.get("/worker/");
        console.log(response.data);

        //{data - message, workers[]}
        return response.data.workers;
        
      } catch (error:any) {
        console.error(`Error failed to load workers ${error}`);
        throw new Error(error.response?.data?.message ||`Failed to load workers,  Please try re-loading page!`)
      }
    },
  }),
});


//get-a-worker with Id
export const workersAtomFamily = atomFamily<WorkerTypes, string>({
    key:"WorkerAtomFamily",
    default:selectorFamily<WorkerTypes,string>({
        key:"WorkerSelectorFamily",
        get:(id:string)=>async()=> {
            try {
                const response = await axiosInstance.get(`/worker/${id}`);
                console.log(response.data);
                //{data - message, worker}
                return response.data.worker;
                
            } catch (error:any) {
                console.error(`Error, failed to load worker data ${error}`);
                throw new Error(error.response?.data?.message || "Failed to load worker data, Please try re-loading page!")
            }
        }
    })
});


//get-wokers-work +admin info-> complete info
// [not a protectedRoute] so, the worker can view their daily work.

export const workerViewAtom = atomFamily<WorkerViewDataTypes, string>({
  key:'WorkerViewAtomFamily',
  default:selectorFamily<WorkerViewDataTypes, string>({

    key:'WorkerViewSelectorFamily',
    get:(id:string)=> async()=>{
    
        try {
          const response = await axiosInstance.get(`/worker/share/${id}`);
          console.log(response.data);
          //data - {message, workData}
          return response.data.workData

        } catch (error:any) {
          console.error(`Failed to load work data ${error}`);
          throw new Error(error.response?.data?.message || "Failed to load work data")
    
        }
      }
    })
})


