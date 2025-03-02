import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/format-date";
import { useState } from "react";
import UpdateWorkerModal from "../../components/workers/UpdateWorkerModal";
import { LuShare2 } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import ShareWorkModal from "../../components/workers/ShareWorkModal";
import AddDailyWork from "../../components/workers/AddDailyWork";
import { useRecoilValueLoadable } from "recoil";
import { workersAtomFamily } from "../../store/workers-store";
import LoadingComp from "../../components/ui/LoadingComp";
import ErrorComp from "../../components/ui/ErrorComp";
import EmptyState from "../../components/ui/EmptyState";

const SingleWorkerPage = () => {
  const { id } = useParams();
  if (!id) return null;
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isShareModal, setIsShareModal] = useState<boolean>(false);
  const [isAddWorkModal, setIsAddWordModal] = useState<boolean>(false);

  const worker = useRecoilValueLoadable(workersAtomFamily(id));
  

  if (worker.state == "loading") {
    return <LoadingComp />;
  }

  if (worker.state == "hasError") {
    return <ErrorComp message={worker.contents?.message} />;
  }

  const tableStyles = "px-4 py-2 border-1 border-gray-500 text-center";
  return (
    <div className="flex justify-center">
      <div className="text-center flex flex-col">
        <div className="inline-block">
          <p className="text-3xl font-bold my-6">Worker Details</p>
          <div className="flex flex-col gap-1 bg-white p-6 rounded-md shadow-sm border-1 border-[#e3e3e3]">
            <p>
              <span className="font-bold">Name : </span>
              {worker.contents.name}
            </p>
            <p>
              <span className="font-bold">Place : </span>
              {worker.contents.place}
            </p>
            <p>
              <span className="font-bold">Join Date : </span>
              {formatDate(worker.contents.joinDate)}
            </p>
            <p>
              <span className="font-bold">Phone No : </span>
              {worker.contents.phoneNo}
            </p>
            <p>
              <span className="font-bold">Email : </span>
              {worker.contents.email}
            </p>
            <button
              onClick={() => setIsModal(true)}
              className="bg-[#b381a9] mt-2 outline-none text-white text-md px-4 py-1 rounded-sm cursor-pointer transition transform hover:scale-105"
            >
              Update Worker Details
            </button>
            {isModal && (
              <UpdateWorkerModal
                isOpen={isModal}
                onClose={() => setIsModal(false)}
                id={worker.contents._id}
              />
            )}
          </div>
        </div>

        <div className="inline-block flex-col gap-2 my-4">
          <p className="text-2xl font-bold my-4">Daily Work</p>
          <div className="flex justify-center gap-2 my-1 ">
            <div
              onClick={() => setIsShareModal(true)}
              className="flex justify-center  px-4 py-2 items-center gap-2 bg-white rounded-sm border-1 border-[#ddc4da] hover:scale-105 transition transform active:scale-95"
            >
              <LuShare2 />
              <button className="  cursor-pointer">Share</button>
            </div>
            <div
              onClick={() => setIsAddWordModal(true)}
              className="flex justify-center px-3 py-1  rounded-sm items-center gap-2 bg-[#c79fc0] cursor-pointer hover:scale-100 transition transform active:scale-95"
            >
              <IoMdAdd />
              <button className="cursor-pointer">Add daily Work</button>
            </div>
          </div>
        </div>

        <div>
          {worker.contents.workData.length == 0 ? (
            <EmptyState
              message={`${worker.contents.name} has no work added. Add their daily tasks to track progress!`}
            />
          ) : (
            <table className="bg-white my-6 shadow-md">
              <thead className="bg-[#ddc4da]">
                <tr>
                  <th className={`${tableStyles}`}>s No.</th>
                  <th className={`${tableStyles}`}>Work</th>
                  <th className={`${tableStyles}`}>Date</th>
                  <th className={`${tableStyles}`}>Amount</th>
                </tr>
              </thead>

              <tbody>
                {worker.contents.workData.map((work, index) => (
                  <tr key={index}>
                    <td className={`${tableStyles}`}>{index + 1}</td>
                    <td className={`${tableStyles}`}>{work.work}</td>
                    <td className={`${tableStyles}`}>
                      {formatDate(work.date)}
                    </td>
                    <td className={`${tableStyles}`}>{work.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* //Sharable link, so that worker can view their data */}
      {isShareModal && (
        <ShareWorkModal
          id={worker.contents._id}
          name={worker.contents.name}
          isOpen={isShareModal}
          onClose={() => setIsShareModal(false)}
        />
      )}

      {isAddWorkModal && (
        <AddDailyWork
          id={worker.contents._id}
          name={worker.contents.name}
          isOpen={isAddWorkModal}
          onClose={() => setIsAddWordModal(false)}
        />
      )}
    </div>
  );
};

export default SingleWorkerPage;
