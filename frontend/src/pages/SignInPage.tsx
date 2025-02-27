import laptopsignin from "../assets/laptopsignin.png";
import SignIn from "../components/SIignIn";

const SignInPage = () => {
  return (
    <div className="bg-gradient-to-br from-[#9C668F] via-[#6E4662] to-[#362130]  min-h-screen w-full flex flex-col  justify-center items-center pt-20">

      {/* hero-heading + sub-headings */}
      <div className="text-center flex flex-col justify-center items-center flex-grow lg:mt-[-100px] mt-10 p-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-white">
          Design
          <span className="text-[#362130]">Desk</span>
        </h1>

        <p className="text-md text-[#ecdeea] sm:text-xl mt-4 mb-2"> 
          Your workspace, just a sign-in away
        </p>
        <span className="text-[#362130] md:text-lg text-md font-bold mb-4">
          Pick up where you left off and streamline your business with ease.
        </span>
      </div>



      {/* //main-content */}
      <div className="flex flex-col lg:flex-row justify-center sm:gap-20 gap-4 items-center lg:mb-[100px] mb-4">
        <SignIn />
        <img src={laptopsignin} alt="Woken at Desk" className="mb-20" />
      </div>
    </div>
  );
};

export default SignInPage;
