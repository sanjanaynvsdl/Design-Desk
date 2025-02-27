import { CircleX } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface updateOrderTypes {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const UpdateOrder = (props: updateOrderTypes) => {
  if (!props.isOpen) {
    return;
  }

  const [newDescription, setDescription] = useState<string>("");
  const [newDeliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"Pending" | "Completed">(
    "Pending"
  );
  const [orderStatus, setOrderStatus] = useState<
    "Pending" | "In Progress" | "Completed"
  >("Pending");

  const handleUpdateOrder = () => {
    console.log(
      `The updated list os the order is ${newDeliveryDate} - deilvery date ${newDescription} - new DEscription `
    );
    console.log(
      `The current order stauts are ${paymentStatus} - payment status ${orderStatus} --the order status`
    );

    setDeliveryDate(null);
    setDescription("");
    setOrderStatus("Pending");
    setPaymentStatus("Pending");
    props.onClose();
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

          <button
            onClick={handleUpdateOrder}
            className="px-14 py-2 my-2 outline-0 border-1 bg-[#9c668f] text-white transition transform hover:scale-104 cursor-pointer rounded-sm"
          >
            Update Order!
          </button>
          <p className=" text-sm text-center">(Update only required feilds)</p>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrder;
