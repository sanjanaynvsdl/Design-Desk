import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SignIn from "../../components/SIignIn";

const SignInPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-[#9C668F] via-[#6E4662] to-[#362130] min-h-screen w-full flex justify-center items-center px-4 py-12 relative">
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors duration-200"
        aria-label="Go back to home"
      >
        <ArrowLeft size={20} />
      </button>
      <SignIn />
    </div>
  );
};

export default SignInPage;
