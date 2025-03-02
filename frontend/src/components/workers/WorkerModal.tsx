import { useState } from "react";
import Input from "../ui/Input";
import { CircleX, Loader2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { axiosInstance } from "../../utils/api/axios-instance";
import ErrorMsg from "../ui/ErrorMsg";
import SuccessMsg from "../ui/SuccessMsg";
import {useRefreshAllWorkers} from '../../store/workers-store';

interface WorkerModalTypes {
  isOpen: boolean;
  onClose: () => void;
}

const WorkerModal = (props: WorkerModalTypes) => {
  if (!props.isOpen) {
    return;
  }

  const [workerName, setName] = useState<string>("");
  const [workerEmail, setEmail] = useState<string>("");
  const [workerPhonNo, setPhoneNo] = useState<string>("");
  const [workerPlace, setPlace] = useState<string>("");
  const [description, setDescripition] = useState<string>("");
  const [joinDate, setJoinDate] = useState<Date | null>(null);

  //handle : BE req's success, error, loading
  const [error, setError] = useState<string | null>(null);
  const [success, setSucessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //hook to udpate UI dynamically after, api call
  const refreshAllWorkers = useRefreshAllWorkers();

  const handleAddWorker = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError(null);
      setIsLoading(true);
      2;
      const response = await axiosInstance.post("/worker/", {
        name: workerName,
        email: workerEmail,
        phoneNo: workerPhonNo,
        place: workerPlace,
        description: description,
        joinDate: joinDate,
      });

      console.log(response.data);

      if (response.data.message) {
        setSucessMsg(response.data.message);
      }

      setName("");
      setEmail("");
      setPlace("");
      setDescripition("");
      setJoinDate(null);

      const timer = setTimeout(() => {
        setSucessMsg(null);
        props.onClose();
        refreshAllWorkers();
      }, 3000);

      return ()=> clearTimeout(timer);

    } catch (error: any) {
      console.error(error);

      if (error.response) {
        setError(error.response?.data?.message || "An error occurred!");
      } else {
        setError("Please try again later, An error occurred!");
      }

      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return ()=> clearTimeout(timer);

    } finally {
      setIsLoading(false);
    }
  };
  const commonInputStyle =
    "p-2 sm:py-3 py-2 m-1 outline-0 border-1 border-[#a19d9d] bg-[#f5eef4] rounded-xs focus:ring-2 focus:ring-[#875479]";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg border-1 border-[#e3e3e3] px-10 sm:px-14 py-12 relative">
        <form className="text-center flex flex-col" onSubmit={handleAddWorker}>
          <div className="flex items-center justify-around mb-5">
            <h1 className="text-2xl text-black pr-5">Create a worker!</h1>
            <CircleX
              size={30}
              className="cursor-pointer hover:scale-105"
              onClick={props.onClose}
            />
          </div>
          <Input
            type="text"
            required={true}
            placeholder="Name"
            value={workerName}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="text"
            required={true}
            placeholder="Email"
            value={workerEmail}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="text"
            required={true}
            placeholder="Phone No."
            value={workerPhonNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />

          <Input
            type="text"
            required={true}
            placeholder="place"
            value={workerPlace}
            onChange={(e) => setPlace(e.target.value)}
          />

          <div className="flex justify-center items-center my-1">
            <textarea
              onChange={(e) => setDescripition(e.target.value)}
              placeholder="A short description about workers skills"
              className="w-60  px-3  py-1 outline-0 border-1 border-[#a19d9d] bg-[#f5eef4] rounded-xs focus:ring-2 focus:ring-[#875479] resize-none"
              rows={4}
              required
            />
          </div>

          <div className="relative flex items-center" style={{ zIndex: 1000 }}>
            <DatePicker
              placeholderText="Join Date"
              selected={joinDate}
              onChange={(date: Date | null) => setJoinDate(date)}
              dateFormat="yyyy-MM-dd"
              className={`${commonInputStyle} w-60  px-4 cursor-pointer `}
              wrapperClassName="w-full"
              required
            />
          </div>

          {/* submit-forn */}
          <div className="flex justify-center ">
            <button
              type="submit"
              className={`bg-[#875479] text-white w-60 py-3  my-1 transition transform   rounded-xs
                ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-[#6e4662] cursor-pointer hover:scale-105"
                }
              `}
            >
              {isLoading ? (
                <div className="flex justify-center items-center gap-3">
                  <Loader2 className="animate-spin" />
                  <p>Loading . . </p>
                </div>
              ) : (
                "Create"
              )}
            </button>
          </div>

          {/* handle success or error msg's */}
          <div className="flex justify-center text-center">
            {error && <ErrorMsg message={error}/>}
            {success && <SuccessMsg message={success}/>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkerModal;
