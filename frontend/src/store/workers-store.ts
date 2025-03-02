import { selector,atom, atomFamily, selectorFamily, useSetRecoilState } from "recoil";
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

interface WorkerViewDataTypes {
  _id: string;
  hash: string;
  workerId: {
    _id: string;
    name: string;
    email: string;
    phoneNo: string;
    place: string;
    description: string;
    joinDate: string;
    workData: workDataType[];
  };
  adminId: {
    _id: string;
    name: string;
    email: string;
    phoneNo:string
  };
}

//refresh atom, for dynamic updates/delete
export const refreshWorkersAtom = atom({
  key:'refreshWorkerAtom',
  default:0,
});

//refresh single worker
export const refershSingleWorkerAtomFam = atomFamily({
  key:'refreshSingleWorkerAtomFam',
  default:0,
});


//refresh daily work, after updating it
export const refreshDailyWork = atomFamily({
  key:'refreshDailywork',
  default:0
});



//get-all workers
export const workersAtom = atom<WorkerTypes[]>({
  key: "WorkersAtom",
  default: selector<WorkerTypes[]>({
    key: "WorkersSeclector",
    get: async ({get}) => {

      get(refreshWorkersAtom);

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
        get:(id:string)=>async({get})=> {

          get(refreshWorkersAtom);
          get(refershSingleWorkerAtomFam(id));
          get(refreshDailyWork(id));

          
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
    get:(hash:string)=> async()=>{
    
      
        try {
          const response = await axiosInstance.get(`/worker/share/${hash}`);
          console.log(response.data);
          //data - {message, workData}
          console.log(`Data of the worker is ${response.data}`);
          return response.data.workerData

        } catch (error:any) {
          console.error(`Failed to load work data ${error}`);
          throw new Error(error.response?.data?.message || "Failed to load work data")
    
        }
      }
    })
});

//hook,
export const useRefreshAllWorkers = ()=>{
  const setRefreshWorkersAtom = useSetRecoilState(refreshWorkersAtom);
  return ()=>{
    setRefreshWorkersAtom(prev=>prev+1);
  }
}

//hook, for singleworker
export const useRefreshSingelWorker = (id:string)=> {
  const setRefreshWorker = useSetRecoilState(refershSingleWorkerAtomFam(id));
  
  return ()=>{
    setRefreshWorker(prev=>prev+1);
  }
}

//hook to update dailyWork
export const useRefreshDailyWork = (id:string)=>{

  // console.log(`Entered for this ${id}`);
  const setRefresher = useSetRecoilState(refreshDailyWork(id));

  return ()=>{
    setRefresher(prev=> prev+1);
  }
}


