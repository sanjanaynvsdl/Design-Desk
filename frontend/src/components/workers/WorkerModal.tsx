import { useState } from "react";
import Input from "../ui/Input";
import { CircleX } from "lucide-react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

interface WorkerModalTypes {
  isOpen: boolean;
  onClose: () => void;
}



const WorkerModal = (props: WorkerModalTypes) => {
    if (!props.isOpen) {
        return;
    }
    const [workerName, setName] = useState<string>("");
    const [workerEmail, setEmail] = useState<string>("");
    const [workerPhonNo, setPhoneNo] = useState<string>("");
    const [workerPlace, setPlace] = useState<string>("");
    const [description, setDescripition] = useState<string>("");
    const [joinDate, setJoinDate] = useState<Date | null>(null);
    
    const handleAddWorker = () => {
      console.log(`this is the new worker data : name is ${workerName} email is ${workerEmail} phoneNo is ${workerPhonNo} place is ${workerPlace} description is ${description} their join date is ${joinDate} `)
    props.onClose();
  };
  const commonInputStyle = "p-2 sm:py-3 py-2 m-1 outline-0 border-1 border-[#a19d9d] bg-[#f5eef4] rounded-xs focus:ring-2 focus:ring-[#875479]";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg border-1 border-[#e3e3e3] text-center flex flex-col px-10 sm:px-14 py-12 relative">
        <div className="flex items-center justify-around mb-5">
          <h1 className="text-2xl text-black pr-5">Create a worker!</h1>
          <CircleX
            size={30}
            className="cursor-pointer hover:scale-105"
            onClick={props.onClose}
          />
        </div>
        <Input
          type="text"
          placeholder="Name"
          value={workerName}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Email"
          value={workerEmail}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Phone No."
          value={workerPhonNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />

        <Input
          type="text"
          placeholder="place"
          value={workerPlace}
          onChange={(e) => setPlace(e.target.value)}
        />

        <textarea
          onChange={(e) => setDescripition(e.target.value)}
          placeholder="A short description about workers skills"
          className="sm:px-4 px-2 sm:py-3 py-2 m-1 outline-0 border-1 border-[#a19d9d] bg-[#f5eef4] rounded-xs focus:ring-2 focus:ring-[#875479] resize-none"
          rows={4} // Adjust the height
        />

        <div className="relative flex items-center" style={{ zIndex: 1000 }} >
          <DatePicker
          placeholderText="Join Date"
            selected={joinDate}
            onChange={(date: Date | null) => setJoinDate(date)}
            dateFormat="yyyy-MM-dd"
            className={`${commonInputStyle} w-60  cursor-pointer `}
            wrapperClassName="w-full"
            
          />
        </div>

        <div>

        <button
          onClick={handleAddWorker}
          className="bg-[#875479] text-white cursor-pointer w-60 py-3  my-1 transition transform hover:scale-105 hover:bg-[#6e4662] rounded-sm"
        >
          Create
        </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerModal;
