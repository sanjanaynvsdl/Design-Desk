import { useState } from "react";
import Button from "../components/ui/Button";
import { ShoppingBag } from "lucide-react";
import OrdersModal from "../components/orders/OrdersModal";
import { useRecoilValueLoadable } from "recoil";
import {  orderTypes,pendingOrders } from "../store/orders-store";
import OrderDetails from "../components/orders/OrderDetails";
import { formatDate } from "../utils/format-date";
import LoadingComp from "../components/ui/LoadingComp";
import ErrorComp from "../components/ui/ErrorComp";
import { userAtom } from "../store/user-store";

const HomePage = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const orders = useRecoilValueLoadable(pendingOrders);
  console.log(orders);
  const adminData = useRecoilValueLoadable(userAtom);
  

  if (orders.state == "loading" || adminData.state=="loading") {
    return <LoadingComp />;
  }

  if (orders.state == "hasError") {
    return <ErrorComp message={orders.contents?.message} />;
  }
  if (adminData.state=="hasError") {
    return <ErrorComp message={adminData.contents?.message} />;
  }

  return (
    <div className="bg-[#f5eef4] w-full min-h-screen">
      <div className="flex justify-between items-center">
        {orders.contents.length == 0 ? (
          <div></div>
        ) : (
          <p className="text-2xl ml-12 font-bold">
            Pending orders to be delivered! 🚀
          </p>
        )}
        <Button
          text="Create Order"
          onClick={() => {
            setIsModal(true);
          }}
          Icon={<ShoppingBag />}
        />
      </div>

      {orders.contents.length == 0 ? (
        <div className="flex justify-center">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-4xl font-bold text-gray-800">
              Hello,  {`${adminData.contents.name}`} 👋
            </h1>
            <p className="text-xl text-gray-600 mt-2 font-semibold">
              Welcome to{" "}
              <span className="font-semibold text-[#875479]">Desing Desk</span>
            </p>

            <div className="mt-6 p-6 bg-white rounded-lg shadow-md border border-gray-200 max-w-md">
              <p className="text-gray-700 text-lg">
                There are no orders in pending. To add new orders, click on the
                <span className="font-semibold text-[#875479]">
                  {" "}
                  "Create Order"{" "}
                </span>
                button <br />
                at the top right.
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-gray-800 font-semibold">
                🔹 What can you do with Desing Desk?
              </p>
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 max-w-md my-4">
                <ul className=" text-gray-600 mt-2 space-y-1 text-left my-4 p-8 ">
                  <ul>📦 Manage orders & customers easily</ul>
                  <ul>📜 Auto-generate invoices in one click</ul>
                  <ul>🔍 Find what you need with search</ul>
                  <ul>📊 Track business growth with insights</ul>
                  <ul>👷 Add workers' daily tasks for easy tracking</ul>
                  <ul>
                    🔗 share a work link with workers for real-time task
                    updates, ensuring transparency.
                  </ul>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid xl:grid-cols-3  lg:grid-cols-2 gap-4 mx-16  grid-cols-1">
            {orders.contents &&
              orders.contents.map((order: orderTypes, index: number) => (
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
      )}
      {isModal && (
        <OrdersModal isOpen={isModal} onClose={() => setIsModal(false)} />
      )}
    </div>
  );
};

export default HomePage;
