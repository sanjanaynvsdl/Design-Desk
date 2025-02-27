import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { TbShoppingCartBolt } from "react-icons/tb";
import { IoPeopleOutline } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { TfiAlignCenter } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

interface SideBarTypes {
  isOpen: boolean;
  setIsOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const SideBar = ({ isOpen, setIsOpen }: SideBarTypes) => {
  const [currPage, setCurrPage] = useState<
    "Home" | "Orders" | "Customers" | "Workers" | "My Profile"
  >("Home");
  const navigate = useNavigate();

  return (
    <div
      className={`fixed bg-white h-screen flex flex-col gap-2 border-r border-gray-300 transition-all duration-300
            ${isOpen ? "w-72" : "w-20"}`}
    >
      <div className="px-4 py-2 my-2 mx-1 flex justify-start items-center gap-4">
        <TfiAlignCenter
          size={24}
          onClick={() => setIsOpen((prev) => !prev)}
          className="transition hover:scale-105  cursor-pointer"
        />

        {isOpen && (
          <p className="text-3xl font-bold tracking-tighter transition-all">
            Design <span className="text-[#875479]">Desk.</span>
          </p>
        )}
      </div>
      <SideBarItem
        text="Home"
        isOpen={isOpen}
        onClick={() => {
          setCurrPage("Home");
        }}
        currPage={currPage}
        navigateTo={() => navigate("/")}
        StartIcon={<AiOutlineHome size={25} />}
      />
      <SideBarItem
        text="Orders"
        isOpen={isOpen}
        currPage={currPage}
        navigateTo={() => navigate("/orders")}
        onClick={() => {
          setCurrPage("Orders");
        }}
        StartIcon={<TbShoppingCartBolt size={25} />}
      />

      <SideBarItem
        text="Customers"
        isOpen={isOpen}
        currPage={currPage}
        navigateTo={() => navigate("/customers")}
        onClick={() => {
          setCurrPage("Customers");
        }}
        StartIcon={<IoPeopleOutline size={25} />}
      />

      <SideBarItem
        text="Workers"
        currPage={currPage}
        isOpen={isOpen}
        navigateTo={() => navigate("/workers")}
        onClick={() => {
          setCurrPage("Workers");
        }}
        StartIcon={<IoPersonAddOutline size={23} />}
      />

      <SideBarItem
        text="My Profile"
        currPage={currPage}
        isOpen={isOpen}
        navigateTo={() => navigate("/myprofile")}
        onClick={() => {
          setCurrPage("My Profile");
        }}
        StartIcon={<GoPerson size={23} />}
      />
    </div>
  );
};

export default SideBar;

interface SideBarItemTypes {
  text: string;
  onClick: () => void;
  currPage: "Home" | "Orders" | "Customers" | "Workers" | "My Profile";
  navigateTo: () => void;
  StartIcon: any;
  isOpen: boolean;
}
const SideBarItem = (props: SideBarItemTypes) => {
  const handleClick = () => {
    props.onClick();
    props.navigateTo();
  };
  return (
      <div
        onClick={handleClick}
        className={`transition-all duration-400 flex px-4 my-1 py-2 mx-2 text-md gap-2 cursor-pointer justify-start items-center  rounded-md ${
          props.currPage == props.text ? "bg-[#ecdeea]" : "hover:bg-[#f5eef4]"
        }`}
      >
      {props.StartIcon}
      {props.isOpen && (
        <span className="ml-2 transition-all">{props.text}</span>
      )}
    </div>
  );
};
