import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  placeholder: string;
  type: string;
  value: string;
  onChange: (e:React.ChangeEvent<HTMLInputElement>)=> void;
}

const Input = (props: InputProps) => {

  const [showPassword, setShowPassword]=useState(false);
  const isPassword = props.type =="password" //if inp is pass, render eye


  return (
    <div className="relative w-full">
        <input
          className="sm:px-4  px-2 sm:py-3  py-2 m-1 outline-0 border-1 border-[#a19d9d] bg-[#f5eef4]"
          type={isPassword && !showPassword ? "password" : "text" }
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
        { isPassword && (
            <button
            type="button"
             className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
             onClick={()=>setShowPassword(!showPassword)}
            >{showPassword? <Eye size={20} /> : <EyeOff size={20} />}</button>
        )}
    </div>
  );
};

export default Input;
