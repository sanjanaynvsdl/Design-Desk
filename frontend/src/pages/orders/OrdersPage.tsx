import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/format-date";
import { useRecoilValueLoadable } from "recoil";
import { ordersAtom, orderTypes } from "../../store/orders-store";
import { LuShoppingBag } from "react-icons/lu";
import LoadingComp from "../../components/ui/LoadingComp";
import ErrorComp from "../../components/ui/ErrorComp";
import EmptyState from "../../components/ui/EmptyState";

const OrdersPage = () => {
  const tableStyles = "px-4 py-2 border-1 border-gray-500";
  const btnStyles =
    "px-4 py-1  text-black rounded-md shadow-sm transition cursor-pointer";
  const navigate = useNavigate();

  const orders = useRecoilValueLoadable(ordersAtom);

  console.log(orders);
  if (orders.state == "loading") {
    return <LoadingComp />;
  }

  if (orders.state == "hasError") {
    return <ErrorComp message={orders.contents?.message} />;
  }

  return (
    <div className="">
      <div className="flex justify-center items-center gap-4 p-2">
        {orders.contents.length > 0 && (
          <div className="flex flex-col justify-center gap-4">
            <p className="text-2xl font-bold">
              Track and manage your orders easily.
            </p>
            <input
              placeholder="Search for a order"
              className="outline-none pr-8 pl-2 py-2 bg-white  border-1 border-[#797474] rounded-xs"
            />
          </div>
        )}
      </div>

      {orders.contents.length == 0 ? (
          <EmptyState
            subHeading="No Orders Yet!"
            message="Start adding new orders from the home page, and they will appear here. Keep track of all your orders in one place!"
            Icon={<LuShoppingBag size={25} />}
          />
      ) : (
        <div className="flex justify-center my-4">
          {orders && (
            <table className="bg-white shadow-md">
              <thead className="bg-[#ddc4da]">
                <tr>
                  <th className={`${tableStyles}`}>S. NO.</th>
                  <th className={`${tableStyles}`}>Customer Name</th>
                  {/* <th>Phone NO.</th> */}
                  <th className={`${tableStyles}`}>Description</th>
                  <th className={`${tableStyles}`}>Order Status</th>
                  <th className={`${tableStyles}`}>Delivery Date</th>
                  <th className={`${tableStyles}`}>Complete Info</th>
                  <th className={`${tableStyles}`}>Delete Order</th>
                </tr>
              </thead>

              <tbody>
                {orders.contents.map((order: orderTypes, index: number) => (
                  <tr key={index}>
                    <td className={`${tableStyles}`}>{index + 1}</td>
                    <td className={`${tableStyles}`}>
                      {order.customerId.name}
                    </td>
                    {/* <td>{order.customerId.phoneNo}</td> */}
                    <td className={`${tableStyles}`}>{order.description}</td>
                    <td className={`${tableStyles}`}>{order.orderStatus}</td>
                    <td className={`${tableStyles}`}>
                      {formatDate(order.deliveryDate)}
                    </td>
                    <td className={`${tableStyles}`}>
                      <button
                        onClick={() => {
                          navigate(`/orders/${order._id}`);
                        }}
                        className={`${btnStyles} bg-[#ecdeea] hover:bg-[#ddc4da]`}
                      >
                        Get-Details
                      </button>
                    </td>
                    <td className={`${tableStyles}`}>
                      {/* //todo: connect to BE */}
                      <button
                        onClick={() => {}}
                        className={`${btnStyles} bg-[#fae9f0] hover:bg-[#d04971]`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
