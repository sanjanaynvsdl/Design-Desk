import { useState } from "react";
import Button from "../components/ui/Button";
import WorkerModal from "../components/workers/WorkerModal";
import { UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/format-date";

const WorkersPage = () => {
  const [isModal, setIsModal] = useState<boolean>(false);

  //todo: GET workers data from backend use recoil

  const workers= [
        {
          _id: "67bb38342cb4338eb5f7d0eb",
          name: "Renuka",
          email: "Renuka@gmail.com",
          phoneNo: "7689256789",
          place: "Gdwl",
          description: "all-rounded",
          joinDate: "2025-01-02T18:30:00.000Z",
          workData: [
                {
                  date: "2025-01-11T18:30:00.000Z",
                  work: "project",
                  amount: 300,
                  _id: "67bb38342cb4338eb5f7d0ec"
                }
            ],
            adminId: "67bb31c378179da0470bd052",
            __v: 0
        },
        {
          _id: "67bb38872cb4338eb5f7d0fa",
          name: "Roja",
          email: "Roja1@gmail.com",
          phoneNo: "7689256789",
          place: "Gdwl",
          description: "all-rounded",
          joinDate: "2025-01-02T18:30:00.000Z",
          workData: [
                {
                  date: "2025-08-02T18:30:00.000Z",
                  work: "project",
                  amount: 300,
                  _id: "67bb38872cb4338eb5f7d0fb"
                },
                {
                  date: "2025-09-02T18:30:00.000Z",
                  work: "Lehanga",
                  amount: 25000,
                  _id: "67bb38dd2cb4338eb5f7d107"
                }
            ],
            adminId: "67bb31c378179da0470bd052",
            __v: 0
        }
    ]
  

  const tableInpStyles = "text-center px-4 py-2 border-1 border-gray-500";
  const btnStyles ="px-4 py-1  text-black rounded-md shadow-sm transition cursor-pointer";
  const navigate = useNavigate();

  //todo: connect to BE" to delete a worker
  const handleDelete = () => {};

  return (
    <div className="">
      <div className="flex justify-center items-center gap-4  p-2">
        <input
          placeholder="Search for a worker"
          className="outline-none pr-8 pl-2 py-2 bg-white  border-1 border-[#797474] rounded-xs"
        />
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
        {workers && (
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
              {workers.map((worker, index) => (
                <tr key={index}>
                  <td className={`${tableInpStyles}`}>{index + 1}</td>
                  <td className={`${tableInpStyles}`}>{worker.name}</td>
                  <td className={`${tableInpStyles}`}>{worker.phoneNo}</td>
                  <td className={`${tableInpStyles}`}>{worker.email}</td>
                  <td className={`${tableInpStyles}`}>{worker.place}</td>
                  <td className={`${tableInpStyles}`}>{formatDate(worker.joinDate)}</td>
                  <td className={`${tableInpStyles} `}>
                    <button
                    onClick={()=>navigate(`/workers/${worker._id}`)}
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
