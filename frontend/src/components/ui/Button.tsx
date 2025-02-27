interface ButtonProps {
  text: string;
  onClick: () => void;
  Icon: any;
}

const Button = (props: ButtonProps) => {
  return (
    <div
      onClick={props.onClick}
      className="flex px-4  py-2 focus: outline-0 bg-[#9c668f] text-white rounded-xs m-4  transition transform hover:scale-105 active:scale-95 shadow-md hover:bg-[#875479]"
    >
      <button className="pr-2 cursor-pointer outline-none">{props.text}</button>
      {props.Icon}
    </div>
  );
};

export default Button;
