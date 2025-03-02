import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/format-date";
import { useRecoilValueLoadable } from "recoil";
import { ordersAtom, orderTypes, useRefreshAllOrders } from "../../store/orders-store";
import { LuShoppingBag } from "react-icons/lu";
import LoadingComp from "../../components/ui/LoadingComp";
import ErrorComp from "../../components/ui/ErrorComp";
import EmptyState from "../../components/ui/EmptyState";
import { useState } from "react";
import { axiosInstance } from "../../utils/api/axios-instance";
import ErrorMsg from "../../components/ui/ErrorMsg";
import SuccessMsg from "../../components/ui/SuccessMsg";

const OrdersPage = () => {
  const navigate = useNavigate();
  const orders = useRecoilValueLoadable(ordersAtom);
  const refershAllOrders=useRefreshAllOrders();

  const [isLoading, setIsLoading]=useState<boolean>(false);
  const [error, setErrorMsg]=useState<string|null>(null);
  const [success, setSuccessMsg]=useState<string|null>(null);

  const [searchQuery, setSearchquery]=useState<string>("");

  
  
  const tableStyles = "px-4 py-2 border-1 border-gray-500";
  const btnStyles ="px-4 py-1  text-black rounded-md shadow-sm transition ";

  if (orders.state == "loading") {
    return <LoadingComp />;
  }
  
  if (orders.state == "hasError") {
    return <ErrorComp message={orders.contents?.message} />;
  }
  
  // const filteredorders = orders.contents.filter((order)=>(
  //   order.customerId.name.toLowerCase().includes(searchQuery.toLowerCase())
  // ));


  const handleDeleteOrder=async(id:string)=>{
    try {
      setIsLoading(true);
      setErrorMsg(null);

      const response = await axiosInstance.delete(`/order/${id}`);
      console.log(response);
      setSuccessMsg(response?.data?.message);

      const timer =setTimeout(()=>{
        setSuccessMsg(null);
        refershAllOrders();
      }, 3000);

      return()=> clearTimeout(timer);
      
    } catch (error:any) {
      console.error(`Error while deleting order ${error}`);
      if(error.response) {
        setErrorMsg(error.response?.data?.message || "An error occurred while deleting order!");
      } else {
        setErrorMsg("An error occurred while deleting order!")
      }

      const timer = setTimeout(()=>{
        setErrorMsg(null);
      },3000);

      return ()=> clearTimeout(timer);
      
    } finally{
      setIsLoading(false);
    }

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
              onChange={(e)=>setSearchquery(e.target.value)}
              className="outline-none pr-8 pl-2 py-2 bg-white  border-1 border-[#797474] rounded-xs"
            />
          </div>
        )}
      </div>

      <div className="flex justify-center text-center">
        {error && <ErrorMsg message={error}/>}
        {success && <SuccessMsg message={success}/>}
      </div>

      {orders.contents.length == 0 ? (
          <EmptyState
            subHeading="No Orders Yet!"
            message="Start adding new orders from the home page, and they will appear here. Keep track of all your orders in one place!"
            Icon={<LuShoppingBag size={25} />}
          />
      ) : (
        <div className="flex justify-center my-4 mx-10">
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
                {orders.contents?.map((order: orderTypes, index: number) => (
                  <tr key={index}>
                    <td className={`${tableStyles}`}>{index + 1}</td>
                    <td className={`${tableStyles}`}>
                      {order.customerId?.name}
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
                        className={`${btnStyles} bg-[#ecdeea] hover:bg-[#ddc4da] cursor-pointer`}
                      >
                        Get-Details
                      </button>
                    </td>
                    <td className={`${tableStyles}`}>
                      <button
                        disabled={isLoading}
                        onClick={()=>handleDeleteOrder(order._id)}
                        className={`${btnStyles} bg-[#f7d7e4] hover:bg-[#d04971]
                        ${isLoading ? 
                          "opacity-30 cursor-not-allowed"
                            :"hover:scale-102 cursor-pointer"
                        }
                      `}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
