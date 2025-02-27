import Button from "../components/ui/Button";
import { useState } from "react";
import CustomerModal from "../components/customers/CustomerModal";
import { UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomersPage = () => {
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();

  const customers = [
    {
      _id: 4,
      name: "Usha",
      phoneNo: "9177007555",
      email: "Usha@gmail.com",
      place: "Hydd",
    },
    {
      _id: 5,
      name: "Usha",
      phoneNo: "9177007555",
      email: "Usha@gmail.com",
      place: "Hydd",
    },
    {
      _id: 6,
      name: "Usha",
      phoneNo: "9177007555",
      email: "Usha@gmail.com",
      place: "Hydd",
    },
    {
      _id: 7,
      name: "Usha",
      phoneNo: "9177007555",
      email: "Usha@gmail.com",
      place: "Hydd",
    },
    {
      _id: 8,
      name: "Usha",
      phoneNo: "9177007555",
      email: "Usha@gmail.com",
      place: "Hydd",
    },
  ];

  const tableStyles = "text-center px-4 py-2 border-1 border-gray-500 text-gray-800 ";
  const btnStyles ="px-4 py-1  text-black rounded-md shadow-sm transition cursor-pointer";

  //delete customer--
  //todo:connect to BE, to delete a customer,
  const handleDelCustomer=()=>{
    alert(`Are you sure want to delete the customer with id`)


  }

  return (
    <div className="">
      <div className="flex justify-center items-center gap-4  p-2">
        <input
          placeholder="Search for a customer"
          className="outline-none px-2 py-2 bg-white  border-1 border-[#797474] rounded-xs"
        />
        <Button
          Icon={<UserRound />}
          text="Add Customer"
          onClick={() => setIsModal(true)}
        />
      </div>

      {isModal && (
        <CustomerModal isOpen={isModal} onClose={() => setIsModal(false)} />
      )}

      <div className="flex justify-center">
        {customers && (
          <table className="bg-white shadow-xl border-1 border-[#e3e3e3]">
            <thead className="bg-[#ddc4da]">
              <tr>
                <th className={`${tableStyles}`}>S.No.</th>
                <th className={tableStyles}>Name</th>
                <th className={tableStyles}>Phone No.</th>
                <th className={tableStyles}>Place</th>
                <th className={tableStyles}>Email</th>
                <th className={tableStyles}>Order History</th>
                <th className={tableStyles}>Delete Customer</th>
                {/* <th className={tableStyles}>Update User</th> */}
              </tr>
            </thead>

            <tbody>
              {customers.map((customer, index) => (
                <tr key={index}>
                  <td className={tableStyles}>{index + 1}</td>
                  <td className={tableStyles}>{customer.name}</td>
                  <td className={tableStyles}>{customer.phoneNo}</td>
                  <td className={tableStyles}>{customer.place}</td>
                  <td className={tableStyles}>{customer.email}</td>

                  <td className={`${tableStyles} `}>
                    <button
                      onClick={() => navigate(`/customers/${customer._id}`)}
                      className={`${btnStyles} bg-[#ecdeea] hover:bg-[#ddc4da]`}
                    >
                    Get-history
                    </button>
                  </td>
                  <td
                    className={`${tableStyles}`}>
                    <button
                      className={`${btnStyles} bg-[#fae9f0] hover:bg-[#d04971]`}
                      onClick={handleDelCustomer}
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

export default CustomersPage;


//todo: A pop for alert do delete
