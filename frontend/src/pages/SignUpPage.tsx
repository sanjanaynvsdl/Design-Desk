import SignUp from "../components/SignUp";
import womenAtDesk from "../assets/womenAtDesk2.png";

const SignUpPage = () => {
  return (
    <div className="bg-gradient-to-br from-[#9C668F] via-[#6E4662] to-[#362130]  min-h-screen w-full flex flex-col  justify-center items-center ">

      <div className="text-center flex flex-col justify-center items-center flex-grow mt-12 p-3">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Welcome to Design 
          <span className="text-[#362130]">Desk</span>
        </h1>
        <p className="text-md text-[#ecdeea] sm:text-xl mt-4 mb-2">
          Simplify your business, from sales to staff. Get organized fast with a
          single, sharp tool.
        </p>
        <span className="text-[#362130] text-lg font-bold mb-4">
          No more paper chaos or lost files.
        </span>
      </div>

      <div className="flex flex-col lg:flex-row justify-center sm:gap-40 gap-4 items-center">
        <SignUp />
        <img src={womenAtDesk} alt="Woken at Desk" className="mb-[100px] mx-auto" />
      </div>
    </div>
  );
};

export default SignUpPage;
