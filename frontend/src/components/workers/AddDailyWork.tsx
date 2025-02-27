import { CircleX } from "lucide-react";
import { useState } from "react";
import Input from "../ui/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DailyWorkTypes {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  id: string;
}

const AddDailyWork = (props: DailyWorkTypes) => {
  const [workType, setWorkType] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);

  //todo: POST : add - worker-daily-work!
  const handleAddWork = () => {
    console.log(
      `The data to add is ${workType} work type ${amount} this is the amout ${date} this is the date`
    );

    try {
      //BE call
    } catch (error) {}

    setAmount("");
    setDate(null);
    setWorkType("");
    props.onClose();
  };

  const commonInputStyle =
    "px-4 py-4 my-1 outline-0 border-1 border-[#a19d9d] bg-[#f5eef4] rounded-xs focus:ring-2 focus:ring-[#875479]";

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-50">
      <div className="bg-white p-8 shadow-md rounded-md border-1 border-[#e3e3e3] flex flex-col justify-center items-center gap-2 mb-[100px]">
        <div className="flex justify-center items-center  mb-4">
          <p className="text-2xl pr-4 font-bold">
            Add {props.name}'s daily work!
          </p>
          <CircleX
            onClick={props.onClose}
            size={30}
            className="cursor-pointer hover:scale-100 transition transform active:scale-95"
          />
        </div>
        <div className="flex flex-col items-center">
          <Input
            type="text"
            placeholder="Work description"
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="relative flex items-center" style={{ zIndex: 1000 }}>
            <DatePicker
              placeholderText="Date"
              selected={date}
              onChange={(date: Date | null) => setDate(date)}
              dateFormat="yyyy-MM-dd"
              className={`${commonInputStyle} w-60  cursor-pointer `}
              wrapperClassName="w-full"
            />
          </div>

          <div className="flex justify-center my-1">
            <button
              className="bg-[#9c668f] w-60 px-6 py-3 rounded-sm transition transform active:scale-95 hover:scale-105 text-white font-bold cursor-pointer"
              onClick={handleAddWork}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDailyWork;
