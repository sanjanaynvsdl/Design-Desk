import { useParams } from "react-router-dom";
import { useState } from "react";
import OrderDetails from "../components/orders/OrderDetails";
import UpdateCustomerModal from "../components/customers/UpdateCustomerModal";
import { formatDate } from "../utils/format-date";

const SingleCustomerPage = () => {
  const { id } = useParams();
  const [isModal, setIsModal] = useState<boolean>(false);

  //todo: BE get-req for a order history or customer and customer details
  const orderHistory = {
    customerDetails: {
      _id: "67bb335178179da0470bd070",
      name: "Sanjana",
      phoneNo: "9177007555",
      email: "sanjanayalamarthi@gmail.com",
      place: "Gdwl",
      adminId: "67bb31c378179da0470bd052",
      createdAt: "2025-02-23T14:40:17.311Z",
      updatedAt: "2025-02-23T14:55:18.670Z",
      __v: 0,
    },
    orders: [
      {
        _id: "67bb335178179da0470bd072",
        customerId: "67bb335178179da0470bd070",
        ordersData: [
          {
            title: "Lehanga",
            quantity: 2,
            unitPrice: 2000,
            totalPrice: 4000,
            _id: "67bb335178179da0470bd076",
          },
          {
            title: "Crop-top",
            quantity: 1,
            unitPrice: 1000,
            totalPrice: 1000,
            _id: "67bb335178179da0470bd077",
          },
          {
            title: "Lehanga",
            quantity: 2,
            unitPrice: 2000,
            totalPrice: 4000,
            _id: "67bb335178179da0470bd078",
          },
        ],
        totalAmount: 3000,
        orderStatus: "Completed",
        description: "Maggam work and stiching",
        deliveryDate: "2025-08-02T18:30:00.000Z",
        paymentStatus: "Completed",
        adminId: "67bb31c378179da0470bd052",
        createdAt: "2025-02-23T14:40:17.357Z",
        updatedAt: "2025-02-23T14:42:31.465Z",
        __v: 0,
      },
      {
        _id: "67bb335178179da0470bd072",
        customerId: "67bb335178179da0470bd070",
        ordersData: [
          {
            title: "Lehanga",
            quantity: 2,
            unitPrice: 2000,
            totalPrice: 4000,
            _id: "67bb335178179da0470bd076",
          },
          {
            title: "Crop-top",
            quantity: 1,
            unitPrice: 1000,
            totalPrice: 1000,
            _id: "67bb335178179da0470bd077",
          },
          {
            title: "Lehanga",
            quantity: 2,
            unitPrice: 2000,
            totalPrice: 4000,
            _id: "67bb335178179da0470bd078",
          },
        ],
        totalAmount: 3000,
        orderStatus: "Completed",
        description: "Maggam work and stiching",
        deliveryDate: "2025-08-02T18:30:00.000Z",
        paymentStatus: "Completed",
        adminId: "67bb31c378179da0470bd052",
        createdAt: "2025-02-23T14:40:17.357Z",
        updatedAt: "2025-02-23T14:42:31.465Z",
        __v: 0,
      },
      {
        _id: "67bb335178179da0470bd072",
        customerId: "67bb335178179da0470bd070",
        ordersData: [
          {
            title: "Lehanga",
            quantity: 2,
            unitPrice: 2000,
            totalPrice: 4000,
            _id: "67bb335178179da0470bd076",
          },
          {
            title: "Crop-top",
            quantity: 1,
            unitPrice: 1000,
            totalPrice: 1000,
            _id: "67bb335178179da0470bd077",
          },
          {
            title: "Lehanga",
            quantity: 2,
            unitPrice: 2000,
            totalPrice: 4000,
            _id: "67bb335178179da0470bd078",
          },
        ],
        totalAmount: 3000,
        orderStatus: "Completed",
        description: "okat",
        deliveryDate: "2025-08-02T18:30:00.000Z",
        paymentStatus: "Completed",
        adminId: "67bb31c378179da0470bd052",
        createdAt: "2025-02-23T14:40:17.357Z",
        updatedAt: "2025-02-23T14:42:31.465Z",
        __v: 0,
      }
    ],
};
console.log(orderHistory);

  return (
    <div className=" flex items-center justify-center">
      <div className="text-center my-4 block">
        <p className="text-2xl font-bold">Customer Details</p>
        <div className="bg-white p-6 m-2 inline-block border-1 border-[#e3e3e3] rounded-xs shadow-xs text-md">
          <p>
            <span className="font-bold">Name :</span>{" "}
            {orderHistory.customerDetails.name}
          </p>
          <p>
            <span className="font-bold">Phone No : </span>{" "}
            {orderHistory.customerDetails.phoneNo}
          </p>
          <p>
            <span className="font-bold">Place : </span>{" "}
            {orderHistory.customerDetails.place}
          </p>
          <p>
            <span className="font-bold">Email : </span>{" "}
            {orderHistory.customerDetails.email}
          </p>
          <p>
            <span className="font-bold">No od orders : </span>10
          </p>
          <button
            onClick={() => setIsModal(true)}
            className="bg-[#b381a9] mt-2 outline-none text-white text-md px-4 py-1 rounded-sm cursor-pointer transition transform hover:scale-105"
          >
            Update Customer Details
          </button>

          {isModal && (
            <UpdateCustomerModal
              isOpen={isModal}
              onClose={() => setIsModal(false)}
              id={orderHistory.customerDetails._id}
              name={orderHistory.customerDetails.name}
            />
          )}
        </div>

        <div className="flex flex-col px-4">
          <p className="text-2xl m-4 font-bold">Order History</p>
          <div className="grid xl:grid-cols-3 grid-cols-1 m-1 gap-4">
            {orderHistory.orders.map((order, index)=>(
                <OrderDetails
                key={index}
                id={order._id}
                ordersData={order.ordersData}
                totalAmount={order.totalAmount}
                orderStatus={order.orderStatus}
                description={order.description}
                deliveryDate={formatDate(order.deliveryDate)}
                paymentStatus={order.paymentStatus}
                createdAt={formatDate(order.createdAt)}
            />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCustomerPage;
