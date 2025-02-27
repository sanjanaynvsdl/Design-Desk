import { useParams } from "react-router-dom";
import OrderDetails from "../components/orders/OrderDetails";
import {formatDate} from "../utils/format-date"

const SingleOrderPage = ()=>{

    const {id} = useParams();

    //todo: send GET-ORDER BE req, for particular order,
    const order= {
        _id: "67bb335178179da0470bd072",
        customerId: {
            _id: "67bb335178179da0470bd070",
            name: "Sanjana",
            phoneNo: "9177007555",
            email: "sanjanayalamarthi@gmail.com",
            place: "Gdwl",
            updatedAt: "2025-02-23T14:55:18.670Z"
        },
        ordersData: [
            {
                title: "Crop-top",
                quantity: 1,
                unitPrice: 1000,
                totalPrice: 1000,
                _id: "67bb335178179da0470bd073"
            },
            {
                title: "Lehanga",
                quantity: 2,
                unitPrice: 2000,
                totalPrice: 4000,
                _id: "67bb335178179da0470bd074"
            },
            {
                title: "Crop-top",
                quantity: 1,
                unitPrice: 1000,
                totalPrice: 1000,
                _id: "67bb335178179da0470bd075"
            },
            {
                title: "Lehanga",
                quantity: 2,
                unitPrice: 2000,
                totalPrice: 4000,
                _id: "67bb335178179da0470bd074"
            },
            {
                title: "Crop-top",
                quantity: 1,
                unitPrice: 1000,
                totalPrice: 1000,
                _id: "67bb335178179da0470bd075"
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
        __v: 0
    }
    return(
        <div className="flex items-center justify-center">
            <div className="text-center block my-4">
                <p className="text-2xl my-4 font-bold">Customer Details</p>
                <div className="bg-white p-6 m-2 inline-block border-1 border-[#e3e3e3] rounded-xs shadow-xs text-md">
                <p><span className="font-bold">Name :</span> {order.customerId.name}</p> 
                <p><span className="font-bold">Place : </span> {order.customerId.place}</p>
                <p><span className="font-bold">Phone No : </span> {order.customerId.phoneNo}</p>
                <p><span className="font-bold">Email : </span>{order.customerId.email}</p>
                </div>

                <div className="flex flex-col">
                    <p className="text-2xl my-4 font-bold">Order Details</p>
                    
                    <OrderDetails
                        id={order._id}
                        ordersData={order.ordersData}
                        totalAmount={order.totalAmount}
                        orderStatus={order.orderStatus}
                        description={order.description}
                        deliveryDate={formatDate(order.deliveryDate)}
                        paymentStatus={order.paymentStatus}
                        createdAt={formatDate(order.createdAt)}
                    />
                </div>
            </div>

        </div>
    )
}

export default SingleOrderPage;