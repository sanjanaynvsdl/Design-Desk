import { useState } from "react";
import Input from "../components/ui/Input";
import { axiosInstance } from "../utils/api/axios-instance";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ErrorMsg from "./ui/ErrorMsg";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      const response = await axiosInstance.post("/auth/signin", {
        email: email,
        password: password,
      });

      console.log(response.data);
      setEmail("");
      setPassword("");
      navigate("/home");
      
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        setError(error.response?.data?.message || "An error occurred!");
      } else {
        setError("Please try again later, An error occurred!");
      }

      const timer = setTimeout(() => {
        setError(null);
      }, 4000);

      return ()=> clearTimeout(timer);

    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white md:px-14 px-6 md:py-12 py-8 inline-block text-center border-2 border-[#e3e3e3] shadow-2xl rounded-xl">
      <form onSubmit={handleSignIn}>
        <div className="flex flex-col">
          <p className="text-2xl font-bold mb-4">SIGN IN</p>
          <p className="mb-3 md:text-md text-sm">
            Welcome back!
            <br />
            —Sign in to continue
          </p>
          <Input
            placeholder="Email"
            type="text"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />

        {/* //submit button */}
          <div className="flex justify-center ">
            <button
              disabled={isLoading}
              type="submit"
              className={`bg-[#875479] text-white text-md w-60 p-2 my-1 rounded-xs transition transform active:scale-95 
                ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-102 cursor-pointer"
                }`}
            >
              {isLoading ? (
                <div className="flex justify-center items-center gap-4">
                  <Loader2 className="animate-spin " />
                  <p>Loading . . .</p>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
          <div className="flex justify-center">
            {error && <ErrorMsg message={error}/>}
          </div>

          <p className="md:text-sm mt-2 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-900 underline">
              SignUp
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
