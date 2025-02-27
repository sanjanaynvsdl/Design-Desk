import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";
import { useState, useEffect } from "react";

const DashboardLayout = () => {
  const [isSideBar, setIsSideBar] = useState<boolean>(true);

  useEffect(()=>{
    const handleResize = ()=>{
        setIsSideBar(window.innerWidth>=640);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return (()=>{
        window.removeEventListener('resize', handleResize);
    })
  },[]);

  return (
    <div className="flex">
      <SideBar isOpen={isSideBar} setIsOpen={setIsSideBar} />
      <div
        className={`flex-1 transition-all duration-300 p-4 bg-[#f5eef4] min-h-screen relative
                ${isSideBar ? "sm:ml-72" : "ml-20"}`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
