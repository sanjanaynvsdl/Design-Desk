import { useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import {workerViewAtom} from "../../store/workers-store";
import LoadingComp from "../../components/ui/LoadingComp";
import ErrorComp from "../../components/ui/ErrorComp";
import {formatDate} from "../../utils/format-date"
import EmptyState from "../../components/ui/EmptyState";

const ViewWorkPage=()=>{

    const {hash}=useParams();
    if(!hash) return null;


    const workersData = useRecoilValueLoadable(workerViewAtom(hash));

    if(workersData.state=="loading") {
        return <LoadingComp/>
    }

    if(workersData.state=="hasError") {
        return <ErrorComp
            message={workersData.contents?.message}
        />
    }
    console.log(workersData.contents);
    console.log(workersData);
    const tableStyles = "px-4 py-2 border-1 border-gray-500 text-center";

    
    return(
        <div className="bg-[#f5eef4] min-h-screen w-full flex justify-center">
        <div className="flex flex-col my-10">

            <p className="text-3xl font-bold"> {`Explore ${workersData.contents.workerId.name}’s Work & Services!🎯`}</p>
            <p className="mt-3 text-center">All the work data is managed by {workersData.contents.adminId.name}  <br/>
            In case of any queries contact admin

            <br/>
            Phone No : {workersData.contents.adminId.phoneNo}
            <br/>
            Email : {workersData.contents.adminId.email}
            </p>
            <div className=" my-6 flex flex-col gap-1 bg-white p-6 rounded-md shadow-sm border-1 border-[#e3e3e3] text-center">
            <p>
              <span className="font-bold">Name : </span>
              {workersData.contents.workerId.name}
            </p>
            <p>
              <span className="font-bold">Place : </span>
              {workersData.contents.workerId.place}
            </p>
            <p>
              <span className="font-bold">Join Date : </span>
              {formatDate(workersData.contents.workerId.joinDate)}
            </p>
            <p>
              <span className="font-bold">Phone No : </span>
              {workersData.contents.workerId.phoneNo}
            </p>
            <p>
              <span className="font-bold">Email : </span>
              {workersData.contents.workerId.email}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="flex justify-center flex-col">
                <p className="text-center text-2xl font-bold my-4">Daily Work</p>

                {workersData.contents.workerId?.workData?.length ==0 ? 
                <EmptyState  message="No work has been added till today!"/> :
                
                <table className="bg-white shadow-xl">
                    <thead className="bg-[#ddc4da]">
                        <tr>
                            <th className={tableStyles}>S. No.</th>
                            <th className={tableStyles}>Work</th>
                            <th className={tableStyles}>Date</th>
                            <th className={tableStyles}>Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {workersData.contents?.workerId.workData.map((work, index)=>(
                            <tr key={index}>
                                <td className={tableStyles}>{index+1}</td>
                                <td className={tableStyles}>{work.work}</td>
                                <td className={tableStyles}>{formatDate(work.date)}</td>
                                <td className={tableStyles}>{work.amount}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            }
            </div>
          </div>
    </div>
</div>
    )
}

export default ViewWorkPage;