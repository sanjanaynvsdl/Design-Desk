import { useState } from "react";
import Input from "../ui/Input";
import { CircleX } from "lucide-react";

interface UpdateWorkerTypes {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const UpdateWorkerModal = (props: UpdateWorkerTypes) => {
  const [name, setName] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [phone, setPhoneNo] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  //todo: think it join date is required to update

  //todo: PUT req, update single worker
  const handleUpdateCustomer = () => {
    console.log(
      `This are the required feilds to update! name is ${name} place is- ${place} phone NO is - ${phone} email is- ${email}`
    );
    setName("");
    setPlace("");
    setEmail("");
    setPhoneNo("");
    props.onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-50">
      <div className="bg-white shadow-md border-1 border-[#e3e3e3] flex flex-col justify-center p-8 ">
        <div className="flex items-center justify-around">
          <h1 className="text-2xl text-black pr-5">Update Worker details</h1>

          <CircleX
            size={30}
            className="cursor-pointer hover:scale-105"
            onClick={props.onClose}
          />
        </div>

        <p className="my-2 text-sm">(Update only required feilds)</p>
        <div className="flex flex-col gap-1">
          <Input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="text"
            value={place}
            placeholder="Place"
            onChange={(e) => setPlace(e.target.value)}
          />

          <Input
            type="text"
            value={phone}
            placeholder="Phone No."
            onChange={(e) => setPhoneNo(e.target.value)}
          />

          <Input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleUpdateCustomer}
            className="px-14 py-3 my-1 outline-0 border-1 w-61  ml-9 bg-[#9c668f] text-white transition transform hover:scale-104 cursor-pointer rounded-sm"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateWorkerModal;
