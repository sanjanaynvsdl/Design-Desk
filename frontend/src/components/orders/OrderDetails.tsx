import { useState } from "react";
import UpdateOrder from "./UpdaterOrder";
import { axiosInstance } from "../../utils/api/axios-instance";
import ErrorMsg from "../ui/ErrorMsg";
import {Loader2} from 'lucide-react';
import {useRefreshAllOrders} from '../../store/orders-store';

interface orderDetailProps {
  id: string;
  ordersData: orderDataTypes[];
  totalAmount: number;
  orderStatus: string;
  description: string;
  deliveryDate: string;
  paymentStatus: string;
  createdAt: string;
}

interface orderDataTypes {
  title: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

const OrderDetails = (props: orderDetailProps) => {
  const [isOrderUpate, setIsOrderUpdate] = useState<boolean>(false);
  
  //error and loading states.
  const [error, setErrMsg]=useState<string |null>(null);
  const [isLoading, setIsLoading]=useState<boolean>(false);
  const refershAllOrders = useRefreshAllOrders();

 
  const handleDelete = async() => {
    try {
      
      setErrMsg(null);
      setIsLoading(true);
      const response = await axiosInstance.delete(`/order/${props.id}`);
      console.log(response.data);
      refershAllOrders();


    } catch (error:any) {
      if(error.response) {
        setErrMsg(error.response?.data?.message || "An error occurred while deleting!");
      } else {
        setErrMsg("An error occurred while deleting!")
      }
      const timer = setTimeout(()=> {
        setErrMsg(null);
      },3000);

      return ()=> clearTimeout(timer);

    } finally{
      setIsLoading(false);
    }

  };


  const tableStyles = "text-xs p-1 border-1 border-gray-400";
  const buttonStyles ="bg-[#c79fc0] text-sm  transition transform hover:bg-[#b381a9]  px-2 py-1 mr-2  rounded-xs outline-none ";
  return (
    <div className="bg-white p-8 border-1 border-[#e3e3e3] shadow-xs rounded-xs text-start">
      <p className="font-bold mb-2">
        {props.createdAt}{" "}
        <span className="text-sm font-normal"> (Ordered-on) </span>
      </p>
      <hr className="w-full border-t border-gray-800 opacity-50" />

      <p className="text-xs my-2">
        <span className="font-medium text-lg">Description </span>
        <br />
        {props.description}
      </p>

      <p className="font-medium : my-2 ">Order Data</p>
      <div className="">
        {props.ordersData && (
          <table className="bg-[#f5eef4]">
            <thead>
              <tr className="">
                <th className={` text-start px-2 ${tableStyles}`}>Item</th>
                <th className={tableStyles}>Quantity</th>
                <th className={tableStyles}>Unit Price</th>
              </tr>
            </thead>

            <tbody>
              {props.ordersData.map((item, index) => (
                <tr key={index} className="">
                  <td className={tableStyles}>{item.title}</td>
                  <td className={tableStyles}>{item.quantity}</td>
                  <td className={tableStyles}>{item.unitPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="text-xs flex flex-col gap-2 my-4  ">
        <p>
          <span className="font-bold">Total Amount : </span>
          {props.totalAmount}
        </p>
        <p>
          <span className="font-bold">Order Status : </span>
          {props.orderStatus}
        </p>
        <p>
          <span className="font-bold">Delivery date : </span>
          {props.deliveryDate}
        </p>
        <p>
          <span className="font-bold">Payment Status : </span>
          {props.paymentStatus}
        </p>
      </div>
      <div className="flex flex-start">
        <button onClick={() => setIsOrderUpdate(true)} className={` cursor-pointer hover:scale-100 ${buttonStyles}`}>
          Update
        </button>
        <button 
        disabled={isLoading}
        onClick={handleDelete} className={`${buttonStyles}
          ${isLoading ? 
             "opacity-70 cursor-not-allowed"
              : "hover:scale-102 cursor-pointer"
          }
        `}>
           {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loader2 className="animate-spin mr-2"  size={15}/>
                  <p>Loading</p>
                </div>
              ) : (
                "Delete"
            )}
        </button>
      </div>
      <div className="flex justify-center text-center">
        {error && <ErrorMsg message={error}/>}
      </div>

      {isOrderUpate && (
        <UpdateOrder
          id={props.id}
          isOpen={isOrderUpate}
          onClose={() => setIsOrderUpdate(false)}
        />
      )}
    </div>
  );
};

export default OrderDetails;
