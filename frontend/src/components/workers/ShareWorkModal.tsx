import { CircleX } from "lucide-react";
import { LuClipboardCheck } from "react-icons/lu";

interface ShareWorkTypes {
  id: string;
  name: string;
  isOpen: boolean;
  onClose: () => void;
}

const ShareWorkModal = (props: ShareWorkTypes) => {

    //todo: handle copy,
  const handleCopy = () => {};

  if(!props.isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black/80">
      <div className="bg-white shadow-md border-1 border-[#e3e3e3] flex flex-col text-center gap-2 p-14 mb-[200px]">
        <div className="flex justify-center items-center">
          <p className="text-2xl pr-4 font-bold">
            Share {props.name}'s work Data
          </p>
          <CircleX onClick={props.onClose} size={30} className="cursor-pointer hover:scale-100 transition transform active:scale-95" />
        </div>
        <p className="text-sm my-2">
          Don't worry workers are not authorized to edit or delete data!
        </p>
        <div className="flex justify-center">
          <button className="text-white bg-[#b381a9] w-60 font-medium py-1 cursor-pointer rounded-md transition-all duration-300 transform shadow-md hover:scale-100 hover:bg-[#875479] active:scale-95">
            Get Link
          </button>
        </div>

        <div className="bg-[#f5eef4] flex  break-words my-2">
          <p className="text-md p-2 flex-1 overflow-hidden break-words">
            http:localhost:5173/workers/share/34314rergdvw http:localho
          </p>
          <button
            onClick={handleCopy}
            className="bg-[#b381a9] text-white p-2 cursor-pointer hover:scale-100 hover:bg-[#875479] active:scale-95"
          >
            <LuClipboardCheck size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareWorkModal;
