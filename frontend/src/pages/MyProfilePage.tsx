import { useRecoilValueLoadable } from "recoil";
import { userAtom } from "../store/user-store";
import LoadingComp from "../components/ui/LoadingComp";
import ErrorComp from "../components/ui/ErrorComp";
import {ordersAtom, pendingOrders} from "../store/orders-store";
import { workersAtom } from "../store/workers-store";
import { customersAtom } from "../store/customers-store";

const MyProfilePage = () => {
  const adminData = useRecoilValueLoadable(userAtom);

  //to-load summary
  const totalOrders = useRecoilValueLoadable(ordersAtom);
  const ordersInPending = useRecoilValueLoadable(pendingOrders);
  const totalWorkers = useRecoilValueLoadable(workersAtom);
  const totalCustomers = useRecoilValueLoadable(customersAtom);

  if (adminData.state == "loading" || totalOrders.state=="loading" || ordersInPending.state=="loading" || totalWorkers.state=="loading" || totalCustomers.state=="loading") {
    return <LoadingComp />;
  }

  if (adminData.state == "hasError") {
    return <ErrorComp message={adminData.contents?.message} />;
  }
  return (
    <div className="flex justify-center my-8">
      <div className="flex justify-center flex-col">
        <div className="inline-block text-center">
          <p className="text-3xl font-bold my-6">
            {" "}
            Hello, {adminData.contents.name}!👋
          </p>
          <p className="mb-6">Let's take a look at your work summary!</p>
          <div className="flex flex-col text-center gap-1 bg-white p-6 rounded-md shadow-sm border-1 border-[#e3e3e3]">
            <p>
              <span className="font-bold">Name : </span>
              {adminData.contents.name}
            </p>
            <p>
              <span className="font-bold">Phone No : </span>
              {adminData.contents.phoneNo}
            </p>
            <p>
              <span className="font-bold">Email : </span>
              {adminData.contents.email}
            </p>
            {/* <button
              onClick={() => setIsModal(true)}
              className="bg-[#b381a9] mt-2 outline-none text-white text-md px-4 py-1 rounded-sm cursor-pointer transition transform hover:scale-105"
            >
              Update Worker Details
            </button> */}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="inline-block text-center">
            <p className="my-6 text-2xl text-[] font-medium">
              📌 Overview of Your{" "}
              <span className="text-[#875479]">Business</span>
            </p>
            <div className="flex flex-col text-left gap-1 bg-white p-6 rounded-md shadow-sm border-1 border-[#e3e3e3]">
              <p>
                <span className="font-bold">🔹 Orders in Pending : </span>
                {ordersInPending.contents?.length}
              </p>
              <p>
                <span className="font-bold">🔹 Total Orders : </span>
                {totalOrders.contents?.length}
              </p>
              <p>
                <span className="font-bold">🔹 Total Customers: </span>
               {totalCustomers.contents?.length}
              </p>
              <p>
                <span className="font-bold">🔹 Total Worker : </span>
                {totalWorkers.contents?.length}
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
