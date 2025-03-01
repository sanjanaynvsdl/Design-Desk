import { useState } from "react";
import Button from "../../components/ui/Button";
import WorkerModal from "../../components/workers/WorkerModal";
import { UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/format-date";
import { workersAtom } from "../../store/workers-store";
import { useRecoilValueLoadable } from "recoil";
import LoadingComp from "../../components/ui/LoadingComp";
import ErrorComp from "../../components/ui/ErrorComp";
import EmptyState from "../../components/ui/EmptyState";

const WorkersPage = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const workers = useRecoilValueLoadable(workersAtom);
  const navigate = useNavigate();

  if (workers.state == "loading") {
    return <LoadingComp />;
  }

  if (workers.state == "hasError") {
    return <ErrorComp message={workers.contents?.message} />;
  }

  const tableInpStyles = "text-center px-4 py-2 border-1 border-gray-500";
  const btnStyles =
    "px-4 py-1  text-black rounded-md shadow-sm transition cursor-pointer";

  //todo: connect to BE" to delete a worker
  const handleDelete = () => {};

  return (
    <div className=" flex flex-col justify-center items-center">
      {workers.contents.length > 0 &&  <p className="text-2xl font-bold my-1">View and manage your list of workers!</p>}
      <div className="flex justify-center items-center gap-4  p-2">
        {workers.contents?.length > 0 ? (
          <input
            placeholder="Search for a worker"
            className="outline-none pr-8 pl-2 py-2 bg-white  border-1 border-[#797474] rounded-xs"
          />
        ) : (
          <div></div>
        )}
        <Button
          Icon={<UserRound />}
          text="Add Worker"
          onClick={() => setIsModal(true)}
        />
        {isModal && (
          <WorkerModal isOpen={isModal} onClose={() => setIsModal(false)} />
        )}
      </div>
      <div className="flex justify-center">
        {workers.contents?.length == 0 ? (
          <EmptyState
            subHeading="No Workers Yet!"
            message="Click on the 'Add' button above to add a new worker and see them listed here."
          />
        ) : (
          <table className="bg-white ">
            <thead className="bg-[#ddc4da]">
              <tr>
                <th className={`${tableInpStyles}`}>S No.</th>
                <th className={`${tableInpStyles}`}>Name</th>
                <th className={`${tableInpStyles}`}>Phone No.</th>
                <th className={`${tableInpStyles}`}>Email</th>
                <th className={`${tableInpStyles}`}>Place</th>
                <th className={`${tableInpStyles}`}>Join Date</th>
                <th className={`${tableInpStyles}`}>Complete Details</th>
                <th className={`${tableInpStyles}`}>Delete-Worker</th>
              </tr>
            </thead>
            <tbody>
              {workers.contents.map((worker, index) => (
                <tr key={index}>
                  <td className={`${tableInpStyles}`}>{index + 1}</td>
                  <td className={`${tableInpStyles}`}>{worker.name}</td>
                  <td className={`${tableInpStyles}`}>{worker.phoneNo}</td>
                  <td className={`${tableInpStyles}`}>{worker.email}</td>
                  <td className={`${tableInpStyles}`}>{worker.place}</td>
                  <td className={`${tableInpStyles}`}>
                    {formatDate(worker.joinDate)}
                  </td>
                  <td className={`${tableInpStyles} `}>
                    <button
                      onClick={() => navigate(`/workers/${worker._id}`)}
                      className={`${btnStyles} bg-[#ecdeea] hover:bg-[#ddc4da]`}
                    >
                      Get-Details
                    </button>
                  </td>
                  <td className={`${tableInpStyles} `}>
                    <button
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
    </div>
  );
};

export default WorkersPage;
