import { useEffect, useState } from "react";
import Input from "../ui/Input";
import { X, IndianRupee, CircleX } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface OrderModalTypes {
  isOpen: boolean;
  onClose: () => void;
}
interface orderDataTypes {
  title: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

const OrdersModal = (props: OrderModalTypes) => {
  if (!props.isOpen) {
    return null;
  }

  //customer-details
  const [customerName, setName] = useState<string>("");
  const [customerPhonNo, setPhoneNo] = useState<string>("");
  const [customerEmail, setEmail] = useState<string>("");
  const [customerPlace, setPlace] = useState<string>("");

  //order-info --curr items state.
  const [currTitle, setCurrTitle] = useState<string>("");
  const [currQuantity, setQuantity] = useState<number>(0);
  const [currUnitPrice, setUnitPrice] = useState<number>(0);
  const [currTotal, setCurrTotal] = useState<number>(0);

  //order-over-view
  const [orderDescription, setDescription] = useState<string>("");
  const [orderData, setOrderData] = useState<orderDataTypes[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  //   const [orderStatus, setOrderStatus] = useState<string>(""); //only for updating!
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);

  //update currTotal, Price
  useEffect(() => {
    setCurrTotal(currQuantity * currUnitPrice);
  }, [currUnitPrice, currQuantity]);

  //update totalAmount, when-ever a new item get's added to orderData,
  useEffect(() => {
    const totalAmount = orderData.reduce(
      (total: number, curr: orderDataTypes) => {
        return (total += curr.totalPrice);
      },
      0
    );
    setTotalAmount(totalAmount);
  }, [orderData]);

  //todo:handle create-order
  //todo: payment status and orderStatus on serve side should be intialized to pending on creating a order!
  const handleCreateOrder = () => {
    console.log(`The name is ${customerName}`);
    console.log(`The emmail is ${customerEmail}`);
    console.log(`The phone No. is ${customerPhonNo}`);
    console.log(`The place is ${customerPlace}`);
    console.log(`The orders data is `);
    orderData.map((order) => console.log(order));

    console.log(`Total amount is : ${totalAmount}`);
    console.log(`The description of order is ${orderDescription}`);
    console.log(`The delivery date is : ${deliveryDate}`);
  };

  const currTotalPrice = currQuantity * currUnitPrice;
  const handleCurrItem = () => {
    console.log(
      `The current data is titel, ${currTitle} qnt, ${currQuantity} price ${currUnitPrice} total ${currTotal}`
    );
    setOrderData((prev) => [
      ...prev,
      {
        title: currTitle,
        quantity: currQuantity,
        unitPrice: currUnitPrice,
        totalPrice: currTotalPrice,
      },
    ]);
    setCurrTitle("");
    setQuantity(0);
    setUnitPrice(0);
    setCurrTotal(0);
  };

  //styles
  const orderDataInp ="px-2 py-1  outline-0 border-1 border-[#a19d9d] bg-[#f5eef4] text-md";
  const tableStyles = "border-1 border-gray-400 px-4 py-1";

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center">
      <div className="bg-white border-2 border-[#e3e3e3] shadow-2xl rounded-lg flex flex-col px-10 py-8">
        <div className="flex items-center gap-2 justify-center mb-2">
          <p className="text-3xl font-bold pr-4">New Order Less gooo!🥳</p>
          <CircleX size={30} onClick={props.onClose}  className="transition-all cursor-pointer hover:scale-105" />
        </div>

        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-xl mt-3">Customer Details</p>
          <div className="flex">
            <Input
              type="text"
              value={customerName}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Email"
              value={customerEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex">
            <Input
              type="text"
              placeholder="Phone No."
              value={customerPhonNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Place"
              value={customerPlace}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mt-4">
          <p className="text-xl mb-3 ">Order Info</p>

          <div className="">
            <div className="flex gap-2">
              <input
                className={`${orderDataInp} w-[150px]`}
                placeholder="Title"
                onChange={(e) => setCurrTitle(e.target.value)}
                value={currTitle}
              />

              <input
                className={`px-2 py-1  outline-0 border-1 border-[#a19d9d] bg-[#f5eef4] text-sm w-[60px]`}
                placeholder="Qnty."
                onChange={(e) => setQuantity(Number(e.target.value))}
                value={currQuantity == 0 ? "" : currQuantity}
              />

              <input
                className={`${orderDataInp} w-[90px]`}
                placeholder="Unit Price"
                onChange={(e) => setUnitPrice(Number(e.target.value))}
                value={currUnitPrice == 0 ? "" : currUnitPrice}
              />

              <div
                className={`${orderDataInp} w-[80px] flex items-center justify-center`}
              >
                <p>
                  <IndianRupee className="text-gray-600" size={17} />
                </p>
                {currTotal == 0 ? (
                  <span className="text-gray-500"> Total</span>
                ) : (
                  <span className="tex-sm text-gray-800">{currTotal}</span>
                )}
              </div>

              <button
                onClick={handleCurrItem}
                className={`outline-none rounded-xs px-2 py-1 text-white bg-[#9c668f] hover:bg-[#875479] transition transform hover:scale-104 cursor-pointer`}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          {orderData.length > 0 && (
            <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
              <thead className="bg-[#b381a9]">
                <tr>
                  <th className={`${tableStyles} text-white`}>S.No</th>
                  <th className={`${tableStyles} text-white`}>Item</th>
                  <th className={`${tableStyles} text-white`}>Quantity</th>
                  <th className={`${tableStyles} text-white`}>Unit Price</th>
                  <th className={`${tableStyles} text-white`}>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((order, index) => (
                  <tr
                    key={index}
                    className="bg-white hover:bg-gray-300 transition"
                  >
                    <td className={`${tableStyles}`}>{index + 1}</td>
                    <td className={`${tableStyles}`}>{order.title}</td>
                    <td className={`${tableStyles}`}>{order.quantity}</td>
                    <td className={`${tableStyles}`}>{order.unitPrice}</td>
                    <td className={`${tableStyles}`}>{order.totalPrice}</td>
                    {/* //todo: delete a item, from array */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Order overview"
          className="mt-6 sm:px-4 px-2 sm:py-3 py-2 m-1 outline-0 border-1 border-[#a19d9d] bg-[#f5eef4] rounded-xs resize-none"
          rows={2} 
        />

        <div className="flex flex-col mt-4 gap-2 justify-center items-center">
          <div className="flex">
            <div
              className=" text-gray-600 flex justify-center items-center text-center p-2 sm:py-3 py-2 m-1 outline-0 border-1 border-[#a19d9d] bg-[#f5eef4] rounded-xs focus:ring-2 focus:ring-[#875479]">
              Total Amount Rs. {totalAmount}
              
            </div>
            <DatePicker
              placeholderText="Delivery Date"
              selected={deliveryDate}
              onChange={(date: Date | null) => setDeliveryDate(date)}
              dateFormat="yyyy-MM-dd"
              className="text-center p-2 sm:py-3 py-2 m-1 outline-0 border-1 border-[#a19d9d] bg-[#f5eef4] rounded-xs"
            />
          </div>
          <button
            onClick={handleCreateOrder}
            className="px-14 sm:py-3 py-2 outline-0 border-1 bg-[#9c668f] text-white transition transform hover:scale-104 cursor-pointer rounded-sm"
          >
            Create Order & send Invoice to mail
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersModal;
