import { useParams } from "react-router-dom";
import OrderDetails from "../../components/orders/OrderDetails";
import {formatDate} from "../../utils/format-date"
import { useRecoilValueLoadable } from "recoil";
import {orderAtomFam} from "../../store/orders-store"
import LoadingComp from "../../components/ui/LoadingComp";
import ErrorComp from "../../components/ui/ErrorComp";

const SingleOrderPage = ()=>{

    const {id} = useParams();

    if(!id) return null;
    const order = useRecoilValueLoadable(orderAtomFam(id));
    
    if(order.state=="loading") {
        return(
            <LoadingComp/>
        )
    }
    
    if(order.state=="hasError") {
        return(
            <ErrorComp message={order.contents?.message}/>
        )
    }



    return(
        <div className="flex items-center justify-center">
            <div className="text-center block my-4">
                <p className="text-2xl my-4 font-bold">Customer Details</p>
                <div className="bg-white p-6 m-2 inline-block border-1 border-[#e3e3e3] rounded-xs shadow-xs text-md">
                <p><span className="font-bold">Name :</span> {order.contents.customerId.name}</p> 
                <p><span className="font-bold">Place : </span> {order.contents.customerId.place}</p>
                <p><span className="font-bold">Phone No : </span> {order.contents.customerId.phoneNo}</p>
                <p><span className="font-bold">Email : </span>{order.contents.customerId.email}</p>
                </div>

                <div className="flex flex-col ">
                    <p className="text-2xl my-4 font-bold">Order Details</p>
                    <div className="flex justify-center mx-16">
                    <OrderDetails
                        id={order.contents._id}
                        ordersData={order.contents.ordersData}
                        totalAmount={order.contents.totalAmount}
                        orderStatus={order.contents.orderStatus}
                        description={order.contents.description}
                        deliveryDate={formatDate(order.contents.deliveryDate)}
                        paymentStatus={order.contents.paymentStatus}
                        createdAt={formatDate(order.contents.createdAt)}
                    />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SingleOrderPage;