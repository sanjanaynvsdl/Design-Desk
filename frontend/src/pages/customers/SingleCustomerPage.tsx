import { useParams } from "react-router-dom";
import { useState } from "react";
import OrderDetails from "../../components/orders/OrderDetails";
import UpdateCustomerModal from "../../components/customers/UpdateCustomerModal";
import { formatDate } from "../../utils/format-date";
import { useRecoilValueLoadable } from "recoil";
import { orderHistoryAtomFam, orderTypes } from "../../store/orders-store";
import LoadingComp from "../../components/ui/LoadingComp";
import ErrorComp from "../../components/ui/ErrorComp";
import EmptyState from "../../components/ui/EmptyState";


const SingleCustomerPage = () => {
  const { id } = useParams();
  const [isModal, setIsModal] = useState<boolean>(false);
  if (!id) return null;

  
  const orderHistory = useRecoilValueLoadable(orderHistoryAtomFam(id));


  if (orderHistory.state == "loading") {
    return <LoadingComp />;
  }

  if (orderHistory.state == "hasError") {
    return <ErrorComp message={orderHistory.contents?.message} />;
  }

  return (
    <div className=" flex items-center justify-center">
      <div className="text-center my-4 block">
        <p className="text-2xl font-bold">Customer Details</p>
        <div className="bg-white p-6 m-2 inline-block border-1 border-[#e3e3e3] rounded-xs shadow-xs text-md">
          <p>
            <span className="font-bold">Name :</span>{" "}
            {orderHistory.contents.customerDetails.name}
          </p>
          <p>
            <span className="font-bold">Place : </span>{" "}
            {orderHistory.contents.customerDetails.place}
          </p>
          <p>
            <span className="font-bold">Phone No : </span>{" "}
            {orderHistory.contents.customerDetails.phoneNo}
          </p>
          <p>
            <span className="font-bold">No of orders placed : </span>
            {orderHistory.contents.orders.length}
          </p>
          <p>
            <span className="font-bold">Email : </span>{" "}
            {orderHistory.contents.customerDetails.email}
          </p>
          <button
            onClick={() => setIsModal(true)}
            className="bg-[#b381a9] mt-2 outline-none text-white text-md px-4 py-1 rounded-sm cursor-pointer transition transform hover:scale-105"
          >
            Update Customer Details
          </button>
        </div>

        <div className="flex flex-col px-4">
          <p className="text-2xl m-4 font-bold">Order History</p>

          {orderHistory.contents.orders.length == 0 ? (
            <div className="flex">
              <EmptyState
                message={` ${orderHistory.contents.customerDetails.name} has no orders yet. Create one from the home page to get started! `}
              />
            </div>
          ) : (
            <div
              className={`grid ${
                orderHistory.contents.orders.length === 1
                  ? "grid-cols-1 place-items-center"
                  
                  : "xl:grid-cols-3"
              } grid-cols-1 m-1 gap-4`}
            >
              {orderHistory.contents.orders.map(
                (order: orderTypes, index: number) => (
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
                )
              )}
            </div>
          )}
        </div>
      </div>
      {isModal && (
        <UpdateCustomerModal
          isOpen={isModal}
          onClose={() => setIsModal(false)}
          id={orderHistory.contents.customerDetails._id}
          name={orderHistory.contents.customerDetails.name}
        />
      )}
    </div>
  );
};

export default SingleCustomerPage;
