import { useState } from "react"
import {CircleX} from 'lucide-react'
import Input from "../ui/Input"

interface updateCustomerTypes{
    isOpen:boolean,
    onClose:()=>void,
    id:string,
    name:string
}

const UpdateCustomerModal = (props: updateCustomerTypes) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNo, setPhoneNo] = useState<string>("");
    const [place, setPlace] = useState<string>("");
  
    //todo:connect backend!
    const handleUpdateCustomer=()=>{
      console.log(`This is the customer data to create new customer ${name} ${place} ${phoneNo} ${email}`);
      props.onClose();
  
    }
  
    if (!props.isOpen) {
      return;
    }
    return (
      <div className="fixed inset-0 flex items-center justify-center  bg-black/70 z-50 ">
        <div className="bg-white p-6 rounded-lg shadow-lg border-1 border-[#e3e3e3] text-center flex flex-col px-6 sm:px-14 py-12">
          <div className="flex items-center justify-around mb-5">
            <h1 className="text-2xl text-black pr-5">Update Customer details</h1>
            <CircleX
              size={30}
              className="cursor-pointer hover:scale-105"
              onClick={props.onClose}
            />
          </div>
          <p className="my-2 text-sm">(Update only required feilds)</p>
          <div>
            <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
  
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
  
          <Input
            type="text"
            placeholder="Phone No."
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
  
          <Input
            type="text"
            placeholder="Place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
  
          <button 
              onClick={handleUpdateCustomer}
              className="bg-[#875479] text-white  w-60 text-center py-3 cursor-pointer my-1 transition transform hover:scale-104 hover:bg-[#6e4662] rounded-xs">
            Update
          </button>
          </div>
        </div>
      </div>
    );
  };

export default UpdateCustomerModal;