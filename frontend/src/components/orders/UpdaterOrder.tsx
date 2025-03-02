import { CircleX,Loader2 } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { axiosInstance } from "../../utils/api/axios-instance";
import ErrorMsg from "../ui/ErrorMsg";
import SuccessMsg from "../ui/SuccessMsg";
import { useRefreshAllOrders } from "../../store/orders-store";

interface updateOrderTypes {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

interface updatedFeildsTypes{
  description?:string,
  deliveryDate?:Date | null,
  paymentStatus?:"Pending" | "Completed" | "",
  orderStatus?:"Pending" | "In Progress" | "Completed" |""
}

const UpdateOrder = (props: updateOrderTypes) => {
  if (!props.isOpen) {
    return;
  }

  const [newDescription, setDescription] = useState<string>("");
  const [newDeliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"Pending" | "Completed" | "">("");
  const [orderStatus, setOrderStatus] = useState<"Pending" | "In Progress" | "Completed" |"">("");

  //handling, loading, error and success states on update.
  const [isLoading, setIsLoading]=useState<boolean>(false);
  const [error, setErrMsg]=useState<string | null>(null);
  const [success, setSuccessMsg]=useState<string| null>(null);

  //update UI, on successfull update
  const refreshOrder = useRefreshAllOrders();
  // const refreshSingleOrder = useRefreshOrder(props.id);


  //update-order
  const handleUpdateOrder = async() => {
    
    const updatedFeilds : updatedFeildsTypes = {}

    if(newDescription.trim().length>0) {
        updatedFeilds.description=newDescription;
    }

    if(newDeliveryDate!==null) {
      updatedFeilds.deliveryDate=newDeliveryDate;
    }

    if(paymentStatus!=="") {
      updatedFeilds.paymentStatus=paymentStatus;
    }

    if(orderStatus!=="") {
      updatedFeilds.orderStatus=orderStatus;
    }

    try {
      setIsLoading(true);
      setErrMsg(null);
      console.log(updatedFeilds);
      const response = await axiosInstance.put(`/order/${props.id}`, updatedFeilds);
      console.log(response.data);
      setSuccessMsg(response.data?.message);

      setDeliveryDate(null);
      setDescription("");
      setPaymentStatus("");
      setOrderStatus("");
      
      const timer = setTimeout(()=> {
        setSuccessMsg(null);
        props.onClose();
        refreshOrder();
        // refreshSingleOrder(); //single order isn't working
      }, 2000);

      return ()=> clearTimeout(timer);

    } catch (error:any) {
      console.error(`Error while updating the order ${error}`);

      if(error.response) {
        setErrMsg(error.response?.data?.message || "An error occurred while updating!");
      } else {
        setErrMsg("An error occurred while updating!")
      }
       
    } finally{
      setIsLoading(false);
    }
  };

  const optionalBtnStyles =
    "text-xs px-2 py-1 rounded-sm mx-1 cursor-pointer  border-1 border-gray-300 ";

  return (
    <div className="fixed flex justify-center items-center inset-0 bg-black/80 z-50">
      <div className="bg-white p-8 rounded-xs shadow-xs border-1 items-center border-[#e3e3e3]">
        <div className="flex items-center justify-around mb-5">
          <h1 className="text-2xl text-black pr-5">Update Order details</h1>
          <CircleX
            size={30}
            className="cursor-pointer hover:scale-105"
            onClick={props.onClose}
          />
        </div>
        <div className="flex flex-col gap-2">
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Order description"
            className="text-center mt-6 sm:px-4 px-3 sm:py-3 py-2 m-1 outline-0 border-1 border-[#a19d9d]  rounded-xs resize-none"
            rows={2}
          />
          <DatePicker
            placeholderText="Update Delivery Date"
            selected={newDeliveryDate}
            onChange={(date: Date | null) => setDeliveryDate(date)}
            dateFormat="yyyy-MM-dd"
            className="ml-[35px] text-center p-2 sm:py-3 outline-0 border-1 border-[#a19d9d] bg-[#f5eef4] rounded-xs"
          />

          <div className="flex justify-between flex-col items-center my-2">
            <p className="my-2 ">Order Status </p>
            <div className="flex justify-center">
              <button
                onClick={() => setOrderStatus("Pending")}
                className={`${optionalBtnStyles} ${
                  orderStatus == "Pending" ? "bg-[#b381a9]" : "bg-[#f5eef4]"
                }`}
              >
                Pending
              </button>
              <button
                className={`${optionalBtnStyles} ${
                  orderStatus == "In Progress" ? "bg-[#b381a9]" : "bg-[#f5eef4]"
                }`}
                onClick={() => setOrderStatus("In Progress")}
              >
                In Progress
              </button>
              <button
                className={`${optionalBtnStyles} ${
                  orderStatus == "Completed" ? "bg-[#b381a9]" : "bg-[#f5eef4]"
                }`}
                onClick={() => setOrderStatus("Completed")}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="flex justify-between flex-col items-center">
            <p className="my-2">Payment status</p>
            <div className="flex justify-center">
              <button
                className={`${optionalBtnStyles} ${
                  paymentStatus == "Pending" ? "bg-[#b381a9]" : "bg-[#f5eef4]"
                }`}
                onClick={() => setPaymentStatus("Pending")}
              >
                Pending
              </button>

              <button
                onClick={() => setPaymentStatus("Completed")}
                className={`${optionalBtnStyles} ${
                  paymentStatus == "Completed" ? "bg-[#b381a9]" : "bg-[#f5eef4]"
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="flex justify-center flex-col">
            <button
              onClick={handleUpdateOrder}
              className={`px-14 py-2 my-2 outline-0 border-1 bg-[#9c668f] text-white transition transform rounded-sm
                ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-102 cursor-pointer"
                }
                `}
            >
             {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loader2 className="animate-spin mr-4" />
                  <p>Loading . . </p>
                </div>
              ) : (
                "Update Order!"
              )}
            </button>
            <p className=" text-sm text-center">(Update only required feilds)</p>
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

export default UpdateOrder;
