import { useState } from "react";
import Input from "../ui/Input";
import { CircleX, Loader2 } from "lucide-react";
import { axiosInstance } from "../../utils/api/axios-instance";

interface customerModalTypes {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerModal = (props: customerModalTypes) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [place, setPlace] = useState<string>("");

  //handling loading and error states
  const [error, setError] = useState<string | null>(null);
  const [success, setSucessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //todo:connect backend!
  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError(null);
      setIsLoading(true);
      const response = await axiosInstance.post("/customer/", {
        name: name,
        phoneNo: phoneNo,
        email: email,
        place: place,
      });

      console.log(response.data);
      if (response.data) {
        setSucessMsg(response.data.message);
      }

      setName("");
      setEmail("");
      setPhoneNo("");
      setPlace("");

      setTimeout(() => {
        setSucessMsg(null);
        props.onClose();
      }, 4000);
    } catch (error: any) {
      console.error(error);

      if (error.response.data) {
        setError(error.response.data.message || "An error occurred!");
      } else {
        setError("Please try again, An error occurred!");
      }

      setTimeout(() => {
        setError(null);
      }, 4000);
    } finally {
      setIsLoading(false);
    }
  };

  if (!props.isOpen) {
    return;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black/70 ">
      <div className="bg-white p-6 rounded-lg shadow-lg border-1 border-[#e3e3e3]  px-10 sm:px-14 py-12">
        <form
          className="text-center flex flex-col"
          onSubmit={handleCreateCustomer}
        >
          <div className="flex items-center justify-around mb-5">
            <h1 className="text-2xl text-black pr-5">Create a customer!</h1>
            <CircleX
              size={30}
              className="cursor-pointer hover:scale-105"
              onClick={props.onClose}
            />
          </div>
          <Input
            type="text"
            value={name}
            required={true}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="email"
            required={true}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="text"
            required={true}
            placeholder="Phone No."
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />

          <Input
            type="text"
            required={true}
            placeholder="Place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className={`bg-[#875479] text-white text-md w-60 p-2 my-1 rounded-xs transition transform active:scale-95 
                ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-102 cursor-pointer"
                }`}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loader2 className="animate-spin mr-4" />
                  <p>Loading . . </p>
                </div>
              ) : (
                "Create"
              )}
            </button>
          </div>

          <div className="flex justify-center break-words text-center my-2">
            {error && (
              <p className="w-60  break-words overflow-hidden text-sm text-red-500  bg-red-100 p-2 rounded-sm border-1 border-red-300">
                {error}
              </p>
            )}
            {success && (
              <p className="w-60 break-words overflow-hidden text-sm text-green-500 bg-green-100 p-2 rounded-sm border-1 border-green-300">
                {success}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;
