import Input from "../components/ui/Input";
import { useState } from "react";

const SignUp = () => {

    
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [password, setPassword] = useState<string>("");

 
  //todo:connect BE
  const handleSignUp = () => {
    console.log(`This are the data of the admin ${name} ${email} ${phoneNo} ${password}`)
  };

  return (
    <div className="bg-white px-14 py-12 inline-block text-center border-2 border-[#e3e3e3] shadow-2xl rounded-xl mb-[100px]">
      <div className="flex flex-col">
        <p className="text-2xl font-bold mb-4">SIGN UP</p>
        <p className="mb-3 text-md">
          Streamline your work with ease
          <br />
          —Sign up today!
        </p>
        <Input
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Phone No."
          type="text"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignUp}
          className="bg-[#875479] text-white text-lg m-1 p-2 rounded-xs transition transform hover:scale-102 cursor-pointer active:scale-95"
        >
          Submit
        </button>

        <p className="text-sm mt-2">Already have an account? SignIn </p>
      </div>
    </div>
  );
};

export default SignUp;
