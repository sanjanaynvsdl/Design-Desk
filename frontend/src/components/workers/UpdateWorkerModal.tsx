import { useState } from "react";
import Input from "../ui/Input";
import { CircleX,Loader2 } from "lucide-react";
import { axiosInstance } from "../../utils/api/axios-instance";
import ErrorMsg from "../ui/ErrorMsg";
import SuccessMsg from "../ui/SuccessMsg";
import { useRefreshSingelWorker } from "../../store/workers-store";

interface UpdateWorkerTypes {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

interface updatedFeildsTypes {
  name?: string;
  email?: string;
  place?: string;
  phoneNo?: string;
}

const UpdateWorkerModal = (props: UpdateWorkerTypes) => {
  const [name, setName] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [phone, setPhoneNo] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  

  //handle loading, error, success staes
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setErrmsg] = useState<string | null>(null);
  const [success , setSuccessMsg]=useState<string | null>(null);


  //hook
  const refreshSingleWorker = useRefreshSingelWorker(props.id);


  const handleUpdateCustomer = async() => {
    const updatedFeilds:updatedFeildsTypes = {};

    if (name.trim().length > 0) {
      updatedFeilds.name = name;
    }

    if (email.trim().length > 0) {
      updatedFeilds.email = email;
    }

    if (place.trim().length > 0) {
      updatedFeilds.place = place;
    }

    if (phone.trim().length > 0) {
      updatedFeilds.phoneNo = phone;
    }

    try {

      setIsLoading(true);
      setErrmsg(null);
      const response = await axiosInstance.put(`/worker/${props.id}`, updatedFeilds);
      console.log(response.data);
      setSuccessMsg(response.data?.message);

      setName("");
      setEmail("");
      setPhoneNo("");
      setPlace("");

      const timer = setTimeout(()=> {
        setSuccessMsg(null);
        props.onClose();
        refreshSingleWorker();
      },3000);

      return ()=> clearTimeout(timer);
      
    } catch (error:any) {

      
      console.error(`Error while updating worker data ${error}`);
      if(error.response) {
        setErrmsg(error.response?.data?.message || "An error occurred while updating!");
      } else {
        setErrmsg("An error occurred while updating, Please try again later!")
      }

      const timer = setTimeout(()=> {
        setErrmsg(null);
      },3000);

      return ()=> clearTimeout(timer);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-50">
      <div className="bg-white shadow-md border-1 border-[#e3e3e3] flex flex-col justify-center p-8 ">
        <div className="flex items-center justify-around">
          <h1 className="text-2xl text-black pr-5">Update Worker details</h1>

          <CircleX
            size={30}
            className="cursor-pointer hover:scale-105"
            onClick={props.onClose}
          />
        </div>

        <p className="my-2 text-sm">(Update only required feilds)</p>
        <div className="flex flex-col gap-1">
          <Input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="text"
            value={place}
            placeholder="Place"
            onChange={(e) => setPlace(e.target.value)}
          />

          <Input
            type="text"
            value={phone}
            placeholder="Phone No."
            onChange={(e) => setPhoneNo(e.target.value)}
          />

          <Input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex justify-center">
          <button
          disabled={isLoading}
            onClick={handleUpdateCustomer}
            className={`bg-[#875479] text-white  w-60 text-center py-3 my-1 transition transform rounded-xs
              ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-[#6e4662] cursor-pointer hover:scale-104 "
              }
            `}
        >
          {isLoading ? (
            <div className="flex justify-center items-center gap-2">
              <Loader2 className="animate-spin " />
              <p className="">Loading . . .</p>
            </div>
          ) : (
            "Update"
          )}
          </button>

          </div>
          <div className="flex justify-center text-center">
            {error && <ErrorMsg message={error}/>}
            {success && <SuccessMsg message={success}/>}

          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateWorkerModal;
