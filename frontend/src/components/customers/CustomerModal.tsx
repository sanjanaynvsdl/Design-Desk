import { useState } from "react";
import Input from "../ui/Input";
import {  CircleX } from "lucide-react";

interface customerModalTypes {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerModal = (props: customerModalTypes) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [place, setPlace] = useState<string>("");

  //todo:connect backend!
  const handleCreateCustomer=()=>{
    console.log(`This is the customer data to create new customer ${name} ${place} ${phoneNo} ${email}`);
    props.onClose()

  }

  if (!props.isOpen) {
    return;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black/70 ">
      <div className="bg-white p-6 rounded-lg shadow-lg border-1 border-[#e3e3e3] text-center flex flex-col px-10 sm:px-14 py-12">
        <div className="flex items-center justify-around mb-5">
          <h1 className="text-2xl text-black pr-5">Create a customer!</h1>
          <CircleX
            size={30}
            className="cursor-pointer hover:scale-105"
            onClick={props.onClose}
          />
        </div>
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

      <div className="flex justify-center">
        <button 
            onClick={handleCreateCustomer}
            className="bg-[#875479] text-white  my-1 py-3 text-lg cursor-pointer w-60 transition transform hover:scale-104 hover:bg-[#6e4662] rounded-xs">
          Create
        </button>
      </div>
      </div>
    </div>
  );
};

export default CustomerModal;
