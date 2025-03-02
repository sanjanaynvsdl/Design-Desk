import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="text-center bg-[rgb(245,238,244)] w-full min-h-screen">
      <div className="flex justify-center flex-col">
        <p className="text-3xl my-10 font-bold">
          Oopss! you are on the wrong page,{" "}
        </p>
        <div className="flex justify-center">
          <div className="  w-80 bg-white border-1 border-[#e3e3e3] shadow-md rounded-md p-6 y-4">
            <p>
              Don't worry! Click on this link to redirect to{" "}
              <Link to="/" className="text-blue-500 underline">
                Home Page
              </Link>
              😊
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
