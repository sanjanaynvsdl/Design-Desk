import { useState } from "react";
import Input from "../components/ui/Input"

const SignIn= ()=>{

    const [email, setEmail]=useState<string>("");
    const [password, setPassword]=useState<string>("");

    //todo:Connect BE
    const handleSignIn=()=>{

    }
    return(
        <div className="bg-white md:px-10  px-4 md:py-12 py-6 inline-block text-center border-2 border-[#e3e3e3] shadow-2xl rounded-lg mb-[100px]">
            <div className="flex flex-col">
            <p className="text-2xl font-bold mb-4">SIGN IN</p>
                <Input
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button 
                    onClick={handleSignIn}
                    className="bg-[#875479] text-white text-lg md:m-1 m-1 py-1 rounded-xs transition transform hover:scale-102 cursor-pointer active:scale-95">
                Submit
            </button>
            {/* //todo:Add Link */}
            <p className="md:text-sm mt-2 text-xs">Don't have an account? SignUp</p>

            </div>

        </div>
    )
}

export default SignIn;