import Input from "../components/ui/Input";
import { useState } from "react";
import { axiosInstance } from "../utils/api/axios-instance";
import { Loader2, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ErrorMsg from "./ui/ErrorMsg";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      setIsLoading(true);

      const response = await axiosInstance.post("/auth/signup", {
        name: name,
        email: email,
        phoneNo: phoneNo,
        password: password,
      });
      console.log(response.data);
      //onSuccess - reset values.
      setName("");
      setEmail("");
      setPhoneNo("");
      setPassword("");
      navigate("/");

    } catch (error: any) {
      console.error(error);
      if (error.response) {
        setError(error.response.data?.message || "An error occurred!");
      } else {
        setError("An error occured! Please try again after some time. ");
      }

      const timer = setTimeout(()=>{
        setError(null);
      },4000);

      return ()=>clearTimeout(timer);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white md:px-14 px-6 md:py-12 py-8 inline-block text-center border-2 border-[#e3e3e3] shadow-2xl rounded-xl relative">
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200"
        aria-label="Go back to home"
      >
        <ArrowLeft size={20} />
      </button>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit} className="">
          <p className="text-2xl font-bold mb-4">SIGN UP</p>
          <p className="mb-3 md:text-md text-sm">
            Streamline your work with ease
            <br />
            —Sign up today!
          </p>
          <Input
            placeholder="Name"
            type="text"
            value={name}
            required={true}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Phone No."
            type="text"
            value={phoneNo}
            required={true}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
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
                  <p className="">Loading . . .</p>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>

          <p className="md:text-sm mt-2 text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-900 underline">
              SignIn
            </Link>
          </p>


          <div className="flex justify-center break-words">
            {error && <ErrorMsg message={error}/>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
