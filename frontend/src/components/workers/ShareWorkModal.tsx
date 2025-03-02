import { CircleX, Loader2 } from "lucide-react";
import { LuClipboardCheck } from "react-icons/lu";
import { axiosInstance } from "../../utils/api/axios-instance";
import { useEffect, useState } from "react";
import ErrorMsg from "../ui/ErrorMsg";
import SuccessMsg from "../ui/SuccessMsg";

interface ShareWorkTypes {
  id: string;
  name: string;
  isOpen: boolean;
  onClose: () => void;
}



const ShareWorkModal = (props: ShareWorkTypes) => {

  if(!props.isOpen) {
    return null;
  }

  //frontend url.
  const baseUrl = import.meta.env.VITE_FRONTEND_URL;

  //unique hash for every worker. 
  const [hash, setHash]=useState<string>("");
  const [shareUrl, setSharableUrl]=useState<string>("");

  const [isCopy, setIsCopied]=useState<boolean>(false);
  const [error, setErrMsg]=useState<string|null>(null);
  const [isLoading, setIsLoading]=useState<boolean>(false);


  useEffect(()=>{
    if(hash) {
      setSharableUrl(`${baseUrl}/workers/share/${hash}`);
    }
  }, [hash]);

//copy to clipboard.
  const handleCopy = async() => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      
      
      const timer = setTimeout(()=>{
        setIsCopied(false);
        setHash("");
        props.onClose();
      }, 3000);
      return ()=> clearTimeout(timer);

    } catch (error:any) {
      console.error(`Error while copying ${error}`);
      setErrMsg(error || "Failed to copy!");
      
      const timer = setTimeout(()=>{
        setErrMsg(null);
      }, 3000);
      
      return ()=>clearTimeout(timer);
      
    } 
  };
  
  //get's an hash, and updates the sharable url
  const handleGetLink = async()=>{
    try {
      setIsLoading(true);
      setErrMsg(null);
      const response = await axiosInstance.post(`/worker/share/`, {
        workerId:props.id
      });
      console.log(response.data);
      setHash(response.data?.hash);


    } catch (error:any) {
      console.error(`Error in create hash ${error}`);
      if(error.response) {
        setErrMsg(error.response?.data?.message || "An error occurred while creating link!")
      } else {
        setErrMsg("Error while copying!");
      }
      
      const timer = setTimeout(()=>{
        setErrMsg(null);
      },3000)

    return ()=> clearTimeout(timer);

    } finally{
      setIsLoading(false);
    }
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
          <button 
          disabled={isLoading}
          onClick={handleGetLink}
          className={`text-white bg-[#b381a9] w-60 font-medium py-1 rounded-md transition-all duration-300 transform shadow-md active:scale-95
            ${isLoading ? "opacity-60 cursor-not-allowed" : 
              "hover:scale-100 hover:bg-[#875479]  cursor-pointer"
            }
          `}>
            {isLoading ? <div className=" flex justify-center items-center gap-2"><Loader2 className="animate-spin"/> <p>Loading . . .</p></div> : "Get Link"}
          </button>
        </div>

        <div className="flex justify-center">

        <div className="bg-[#f5eef4] flex  w-100 break-words my-2">
          <p className="text-md p-2 flex-1 overflow-hidden break-words">
           {shareUrl}
          </p>
          <button
            onClick={handleCopy}
            className="bg-[#b381a9] text-white p-2 cursor-pointer hover:scale-100 hover:bg-[#875479] active:scale-95"
          >
            <LuClipboardCheck size={25} />
          </button>
        </div>
        </div>

        <div className="flex justify-center text-center">
          {error && <ErrorMsg message={error}/>}
          {isCopy && <SuccessMsg message="Copied to clipboard!"/>}

        </div>
      </div>
    </div>
  );
};

export default ShareWorkModal;
