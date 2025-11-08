import { useState } from "react";
import Button from "../../components/ui/Button";
import WorkerModal from "../../components/workers/WorkerModal";
import { UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/format-date";
import { workersAtom, useRefreshAllWorkers } from "../../store/workers-store";
import { useRecoilValueLoadable } from "recoil";
import LoadingComp from "../../components/ui/LoadingComp";
import ErrorComp from "../../components/ui/ErrorComp";
import EmptyState from "../../components/ui/EmptyState";
import { axiosInstance } from "../../utils/api/axios-instance";
import ErrorMsg from "../../components/ui/ErrorMsg";
import SuccessMsg from "../../components/ui/SuccessMsg";


const WorkersPage = () => {

  const navigate = useNavigate();
  const workers = useRecoilValueLoadable(workersAtom);
  const [isModal, setIsModal] = useState<boolean>(false);

  const [error, setErrMsg]=useState<string|null>(null);
  const [success, setSuccessMsg]=useState<string|null>(null);

  //hook, to render UI after successful del
  const refreshAllWorkers=useRefreshAllWorkers();

  const [searchQuery, setSearchquery]=useState<string>("");



  if (workers.state == "loading") {
    return <LoadingComp />;
  }

  if (workers.state == "hasError") {
    return <ErrorComp message={workers.contents?.message} />;
  }

  const tableInpStyles = "text-center px-4 py-2 border-1 border-gray-500";
  const btnStyles ="px-4 py-1  text-black rounded-md shadow-sm transition cursor-pointer";

  const filteredWorkers = workers.contents.filter((worker)=>(
    worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    worker.email.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  ));

  
  const handleDelete = async(id:string) => {
    try {

      setErrMsg(null);
      const response = await axiosInstance.delete(`/worker/${id}`);
      console.log(response.data);

      setSuccessMsg(response.data?.message);

      const timer = setTimeout(()=>{
        setSuccessMsg(null);
        refreshAllWorkers();
      }, 2000);

      return ()=> clearTimeout(timer);
    } catch (error:any) {

      console.error(`failed to delete worker ${error}`);
      if(error.response) {
        setErrMsg(error.response?.data?.message || "An error occurred while deleting worker!");
      } else {
        setErrMsg("Failed to delete worker data!")
      }

      const timer = setTimeout(()=>{
        setErrMsg(null);
      }, 3000);

      return ()=> clearTimeout(timer);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      {workers.contents.length > 0 &&  <p className="text-2xl font-bold my-1">View and manage your list of workers!</p>}
      <div className="flex justify-center items-center gap-4  p-2">
        {workers.contents?.length > 0 ? (
          <input
          value={searchQuery}
          onChange={(e)=>setSearchquery(e.target.value)}
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
      <div className="flex justify-center text-center mb-4">
        {error && <ErrorMsg message={error}/>}
        {success && <SuccessMsg message={success}/>}

      </div>

      {searchQuery!=="" &&  filteredWorkers.length==0 && <EmptyState message="No worker matches with you search query"/>}
      <div className="flex justify-center">
        {workers.contents?.length == 0 ? (
          <EmptyState
            subHeading="No Workers Yet!"
            message="Click on the 'Add' button above to add a new worker and see them listed here."
          />
        ) : ( 
          
          <table className="bg-white ">
            {filteredWorkers.length>0 && 
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
            </thead> }
            <tbody>
              {filteredWorkers.map((worker, index) => (
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
                      onClick={() => navigate(`/home/workers/${worker._id}`)}
                      className={`${btnStyles} bg-[#ecdeea] hover:bg-[#ddc4da]`}
                    >
                      Get-Details
                    </button>
                  </td>
                  <td className={`${tableInpStyles} `}>
                    <button
                      onClick={()=>handleDelete(worker._id)}
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
