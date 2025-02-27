import { useState } from "react";
import UpdateOrder from "./UpdaterOrder";

interface orderDetailProps{
  id:string,
  ordersData:orderDataTypes[],
  totalAmount:number,
  orderStatus:string,
  description:string,
  deliveryDate:string,
  paymentStatus:string,
  createdAt:string,
}

interface orderDataTypes{
  title:string,
  quantity:number,
  unitPrice:number,
  totalPrice:number,
}

const OrderDetails = (props:orderDetailProps) => {
  const [isOrderUpate, setIsOrderUpdate] = useState<boolean>(false);

  
  //todo:connect backend to del with that id
  const handleDelete = () => {};
  // console.log(props);

  const tableStyles = "text-xs p-1 border-1 border-gray-400";
  const buttonStyles ="bg-[#c79fc0] text-sm cursor-pointer hover:scale-100 transition transform hover:bg-[#b381a9]  px-2 py-1 mr-2  rounded-xs outline-none ";
  return (
    <div className="bg-white p-8 border-1 border-[#e3e3e3] shadow-xs rounded-xs text-start">

      <p className="font-bold mb-2">{props.createdAt} <span className="text-sm font-normal">   (Ordered-on)  </span></p>
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


      <div className="my-2 text-xs flex flex-col gap-2 my-4  ">
        <p><span className="font-bold">Total Amount : </span>{props.totalAmount}</p>
        <p><span className="font-bold">Order Status : </span>{props.orderStatus}</p>
        <p><span className="font-bold">Delivery date : </span>{props.deliveryDate}</p>
        <p><span className="font-bold">Payment Status : </span>{props.paymentStatus}</p>
      </div>
      <div className="flex flex-start">
        <button onClick={() => setIsOrderUpdate(true)} className={buttonStyles}>
          Update
        </button>
        <button onClick={handleDelete} className={buttonStyles}>
          Delete
        </button>
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
