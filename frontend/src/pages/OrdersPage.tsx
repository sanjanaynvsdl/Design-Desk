import { useNavigate } from "react-router-dom";
import {formatDate} from "../utils/format-date";

const OrdersPage = () => {
  const orders = [
    {
      _id: "67bb329078179da0470bd06a",
      customerId: {
        _id: "67bb329078179da0470bd068",
        name: "Sanju ",
        phoneNo: "7816071938",
        email: "sanjanaynvsdl@gmail.com",
        place: "Gdwl",
        updatedAt: "2025-02-23T14:37:04.507Z",
      },
      ordersData: [
        {
          title: "Lehanga",
          quantity: 2,
          unitPrice: 2000,
          totalPrice: 4000,
          _id: "67bb329078179da0470bd06c",
        },
      ],
      totalAmount: 5000,
      orderStatus: "Pending",
      description: "Maggam work and stiching",
      deliveryDate: "2025-08-02T18:30:00.000Z",
      paymentStatus: "Pending",
      adminId: "67bb31c378179da0470bd052",
      createdAt: "2025-02-23T14:37:04.554Z",
      updatedAt: "2025-02-23T14:37:04.554Z",
      __v: 0,
    },
    {
      _id: "67bb329078179da0470bd06a",
      customerId: {
        _id: "67bb329078179da0470bd068",
        name: "Sanju ",
        phoneNo: "7816071938",
        email: "sanjanaynvsdl@gmail.com",
        place: "Gdwl",
        updatedAt: "2025-02-23T14:37:04.507Z",
      },
      ordersData: [
        {
          title: "Crop-top",
          quantity: 1,
          unitPrice: 1000,
          totalPrice: 1000,
          _id: "67bb329078179da0470bd06b",
        },
      ],
      totalAmount: 5000,
      orderStatus: "Pending",
      description: "Maggam work and stiching",
      deliveryDate: "2025-08-02T18:30:00.000Z",
      paymentStatus: "Pending",
      adminId: "67bb31c378179da0470bd052",
      createdAt: "2025-02-23T14:37:04.554Z",
      updatedAt: "2025-02-23T14:37:04.554Z",
      __v: 0,
    },
    {
      _id: "67bb329078179da0470bd06a",
      customerId: {
        _id: "67bb329078179da0470bd068",
        name: "Sanju ",
        phoneNo: "7816071938",
        email: "sanjanaynvsdl@gmail.com",
        place: "Gdwl",
        updatedAt: "2025-02-23T14:37:04.507Z",
      },
      ordersData: [
        {
          title: "Lehanga",
          quantity: 2,
          unitPrice: 2000,
          totalPrice: 4000,
          _id: "67bb329078179da0470bd06c",
        },
      ],
      totalAmount: 5000,
      orderStatus: "Pending",
      description: "Maggam work and stiching",
      deliveryDate: "2025-08-02T18:30:00.000Z",
      paymentStatus: "Pending",
      adminId: "67bb31c378179da0470bd052",
      createdAt: "2025-02-23T14:37:04.554Z",
      updatedAt: "2025-02-23T14:37:04.554Z",
      __v: 0,
    },
    {
      _id: "67bb329078179da0470bd06a",
      customerId: {
        _id: "67bb329078179da0470bd068",
        name: "Sanju ",
        phoneNo: "7816071938",
        email: "sanjanaynvsdl@gmail.com",
        place: "Gdwl",
        updatedAt: "2025-02-23T14:37:04.507Z",
      },
      ordersData: [
        {
          title: "Crop-top",
          quantity: 1,
          unitPrice: 1000,
          totalPrice: 1000,
          _id: "67bb329078179da0470bd06b",
        },
      ],
      totalAmount: 5000,
      orderStatus: "Pending",
      description: "Maggam work and stiching",
      deliveryDate: "2025-08-02T18:30:00.000Z",
      paymentStatus: "Pending",
      adminId: "67bb31c378179da0470bd052",
      createdAt: "2025-02-23T14:37:04.554Z",
      updatedAt: "2025-02-23T14:37:04.554Z",
      __v: 0,
    },
    {
      _id: "67bb329078179da0470bd06a",
      customerId: {
        _id: "67bb329078179da0470bd068",
        name: "Sanju ",
        phoneNo: "7816071938",
        email: "sanjanaynvsdl@gmail.com",
        place: "Gdwl",
        updatedAt: "2025-02-23T14:37:04.507Z",
      },
      ordersData: [
        {
          title: "Crop-top",
          quantity: 1,
          unitPrice: 1000,
          totalPrice: 1000,
          _id: "67bb329078179da0470bd06b",
        },
      ],
      totalAmount: 5000,
      orderStatus: "Pending",
      description: "Maggam work and stiching",
      deliveryDate: "2025-08-02T18:30:00.000Z", 
      paymentStatus: "Pending",
      adminId: "67bb31c378179da0470bd052",
      createdAt: "2025-02-23T14:37:04.554Z",
      updatedAt: "2025-02-23T14:37:04.554Z",
      __v: 0,
    },
  ];

  const tableStyles = 'px-4 py-2 border-1 border-gray-500';
  const btnStyles ="px-4 py-1  text-black rounded-md shadow-sm transition cursor-pointer";
  const navigate=useNavigate();


  //todo: GET BE get-all-req's
  //todo: get the orders length
  if(orders.length==0) {
    return(
      <div>
        There are no orders!
      </div>
    )
  }

  return (
    <div className="">
      <div className="flex justify-center items-center gap-4 p-2">
        <input
          placeholder="Search for a order"
          className="outline-none pr-8 pl-2 py-2 bg-white  border-1 border-[#797474] rounded-xs"
        />
      </div>

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

              {orders.map((order, index)=>(
                <tr key={index}>
                  <td className={`${tableStyles}`}>{index+1}</td>
                  <td className={`${tableStyles}`}>{order.customerId.name}</td>
                  {/* <td>{order.customerId.phoneNo}</td> */}
                  <td className={`${tableStyles}`}>{order.description}</td>
                  <td className={`${tableStyles}`}>{order.orderStatus}</td>
                  <td className={`${tableStyles}`}>{formatDate(order.deliveryDate)}</td>
                  <td className={`${tableStyles}`}>
                    <button
                      onClick={()=>{navigate(`/orders/${order._id}`)}}
                      className={`${btnStyles} bg-[#ecdeea] hover:bg-[#ddc4da]`}
                    >Get-Details</button>
                  </td>
                  <td className={`${tableStyles}`}>
                {/* //todo: connect to BE */}
                    <button
                      onClick={()=>{}}
                      className={`${btnStyles} bg-[#fae9f0] hover:bg-[#d04971]`}
                    >Delete</button>
                  </td>


                </tr>
              ))}
            </tbody>
          </table>
        )}

        
      </div>
    </div>
  );
};

export default OrdersPage;
