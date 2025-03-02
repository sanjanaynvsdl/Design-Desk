import { useState } from "react";
import { CircleX, Loader2 } from "lucide-react";
import Input from "../ui/Input";
import { axiosInstance } from "../../utils/api/axios-instance";
import ErrorMsg from "../ui/ErrorMsg";
import SuccessMsg from "../ui/SuccessMsg";
import {useRecoilValue, useRecoilValueLoadable} from 'recoil'
import {useRefreshAllCustomers} from "../../store/customers-store";

interface updateCustomerTypes {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  name: string;
}

interface updatedFeildsTypes {
  name?: string;
  email?: string;
  place?: string;
  phoneNo?: string;
}

const UpdateCustomerModal = (props: updateCustomerTypes) => {
  if (!props.isOpen) {
    return null;
  }
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [place, setPlace] = useState<string>("");

  //loading, error and success states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setErrmsg] = useState<string | null>(null);
  const [success, setSuccessMsg] = useState<string | null>(null);

  //hook to re-fetch customers after update ,nd it atom should be subscribed to comp.
  const refreshAllCustomers = useRefreshAllCustomers();

  
  

  const handleUpdateCustomer = async () => {
    const updatedFeilds: updatedFeildsTypes = {};

    if (name.trim().length > 0) {
      updatedFeilds.name = name;
    }

    if (email.trim().length > 0) {
      updatedFeilds.email = email;
    }

    if (place.trim().length > 0) {
      updatedFeilds.place = place;
    }

    if (phoneNo.trim().length > 0) {
      updatedFeilds.phoneNo = phoneNo;
    }

    try {
      setErrmsg(null);
      setIsLoading(true);

      const response = await axiosInstance.put(
        `/customer/${props.id}`,
        updatedFeilds
      );
      console.log(response.data);
      setSuccessMsg(response.data.message);

      setName("");
      setEmail("");
      setPhoneNo("");
      setPlace("");

      const timer = setTimeout(() => {
        setSuccessMsg(null);
        props.onClose();
        refreshAllCustomers();

      }, 3000);
      
      return () => clearTimeout(timer);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrmsg(
          error.response.data.message || "An error occurred whilte updating!"
        );
      } else {
        setErrmsg("An error occurred while updating!");
      }

      const timer = setTimeout(() => {
        setErrmsg(null);
      }, 4000);

      return () => clearTimeout(timer);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black/70 z-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg border-1 border-[#e3e3e3] text-center flex flex-col px-6 sm:px-14 py-12">
        <div className="flex items-center justify-around mb-5">
          <h1 className="text-2xl text-black pr-5">Update Customer details</h1>
          <CircleX
            size={30}
            className="cursor-pointer hover:scale-105"
            onClick={props.onClose}
          />
        </div>
        <p className="my-2 text-sm">(Update only required feilds)</p>
        <div>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Phone No."
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />

          <div className="flex justify-center">
            <button
              onClick={handleUpdateCustomer}
              className={`bg-[#875479] text-white w-60 text-center py-3 my-1 transition transform rounded-xs
                  ${
                    isLoading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-[#6e4662] cursor-pointer hover:scale-104 "
                  }
                `}
            >
              {isLoading ? (
                <div className="flex justify-center items-center gap-2">
                  <Loader2 className="animate-spin"/>
                  <p className="">Loading . . .</p>
                </div>
              ) : (
                "Update"
              )}
            </button>
          </div>
            <div className="flex justify-center break-words  text-center my-1">
              {error && <ErrorMsg message={error} />}
              {success && <SuccessMsg message={success} />}
            </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomerModal;
