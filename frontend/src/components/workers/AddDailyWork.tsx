import { CircleX, Loader2 } from "lucide-react";
import { useState } from "react";
import Input from "../ui/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { axiosInstance } from "../../utils/api/axios-instance";
import ErrorMsg from "../ui/ErrorMsg";
import SuccessMsg from "../ui/SuccessMsg";
import {useRefreshDailyWork} from '../../store/workers-store';

interface DailyWorkTypes {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  id: string;
}

const AddDailyWork = (props: DailyWorkTypes) => {
  const [workType, setWorkType] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [workDate, setWorkDate] = useState<Date|null>(null);

  const [error, setErrMsg]=useState<string|null>(null);
  const [success, setSuccessMsg]=useState<string|null>(null);
  const [isloading, setIsLoadin]=useState<boolean>(false);

  //hook, renders workdata dynamically after api call
const refreshDailyWork = useRefreshDailyWork(props.id);
 
  const handleAddWork = async(e:React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Entered!");
      setIsLoadin(true);
      setErrMsg(null);
      const response = await axiosInstance.put(`/worker/daily-work/${props.id}`, {
        date: workDate,
        work:workType,
        amount:amount
      });
      setSuccessMsg(response.data?.message);
      console.log(response.data);
      
      setAmount("");
      setWorkDate(null);
      setWorkType("");

      const timer = setTimeout(()=>{
        setSuccessMsg(null);
        props.onClose();
        refreshDailyWork();
    }, 3000);

    return ()=> clearTimeout(timer);

    } catch (error:any) {

      if(error.response) {
        setErrMsg(error.response?.data?.message || "An error occurred while updating!")
      } else {
        setErrMsg("An error occured while updating daily work!")
      }

      const timer = setTimeout(()=>{
        setErrMsg(null);

      }, 3000);

      return ()=> clearTimeout(timer);

    } finally {
      setIsLoadin(false);
    }

  } 

  const commonInputStyle =
    "px-4 py-4 my-1 outline-0 border-1 border-[#a19d9d] bg-[#f5eef4] rounded-xs focus:ring-2 focus:ring-[#875479]";

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-50">
      <div className="bg-white p-8 shadow-md rounded-md border-1 border-[#e3e3e3]  mb-[100px]">
        <form className="flex flex-col justify-center items-center gap-2" onSubmit={handleAddWork}>
        <div className="flex justify-center items-center  mb-4">
          <p className="text-2xl pr-4 font-bold">
            Add {props.name}'s daily work!
          </p>
          <CircleX
            onClick={props.onClose}
            size={30}
            className="cursor-pointer hover:scale-100 transition transform active:scale-95"
          />
        </div>
        <div className="flex flex-col items-center">
          <Input
            type="text"
            required
            value={workType}
            placeholder="Work description"
            onChange={(e) => setWorkType(e.target.value)}
          />

          <Input
            type="text"
            required
            value={amount}
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="relative flex items-center" style={{ zIndex: 1000 }}>
            <DatePicker
              required
              selected={workDate}
              placeholderText="Date"
              dateFormat="yyyy-MM-dd"
              onChange={(date: Date | null) => setWorkDate(date)}
              className={`${commonInputStyle} w-60  cursor-pointer `}
              wrapperClassName="w-full"
            />
          </div>

          <div className="flex justify-center my-1">
            <button
              disabled={isloading}
              className={`bg-[#9c668f] w-60 px-6 py-3 rounded-sm transition transform active:scale-95  text-white font-bold 
                ${isloading ? "opacity-50 cursor-not-allowed" :
                  "hover:scale-105 cursor-pointer"
                }
                `}
              type="submit"
            >
              {
                isloading ? <div className="flex justify-center items-center gap-2"><Loader2 className="animate-spin"/> <p>Loading. . . </p></div> : "Add"
              }
            </button>
          </div>
          <div className="flex justify-center text-center">
            {error && <ErrorMsg message={error}/>} 
            {success && <SuccessMsg message={success}/>}

          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default AddDailyWork;
