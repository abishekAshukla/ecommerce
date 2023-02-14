import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div className="login  bg-blue-300 mt-[52px] flex">
      <div className="welcome-login w-[50%] h-[95vh] flex flex-col justify-between items-center py-10">
        <h2 className="text-[20px] font-extrabold text-center">
          Welcome to the world of Bewakoof!
        </h2>
        <div>
          <img
            src="https://images.bewakoof.com/web/group-19-1617704502.png"
            alt="Welcome Image"
          />
        </div>
      </div>
      <div className="credentials bg-white h-[95vh] w-[50%] flex flex-col items-center justify-center py-2">
        <h1 className="text-[24px] font-extrabold">Log in / Sign up</h1>
        <h2 className="text-[18px] text-[#A0A0A0] mt-3 font-semibold text-center">
          for Latest trends, exciting offers and everything Bewakoof!
        </h2>
        <input
          className="mt-3 border-2 border-[rgba(0,0,0,.2)] md:w-[60%] w-[90%] h-14 placeholder:text-black placeholder:font-extrabold rounded"
          type="text"
          placeholder="  Enter Email"
        />
        <input
          className="mt-5 border-2 border-[rgba(0,0,0,.2)] md:w-[60%] w-[90%] h-14 placeholder:text-black placeholder:font-extrabold rounded"
          type="password"
          name="password"
          placeholder="  Enter Password"
        />
        <button className="mt-5 bg-[#42A2A2] text-[20px] text-white md:w-[60%] w-[90%] h-14 rounded font-bold">
          CONTINUE
        </button>
        <h2 className="text-[16px] mt-3 font-semibold text-center">OR</h2>
        <div className="flex md:w-[60%] w-[90%] justify-between">
          <div className="flex items-center justify-center rounded-[6px] text-[#202020] font-extrabold h-[40px] w-[45%] border-[1px] border-[rgba(0,0,0,.2)]">
            <img
              className="w-[18px] h-[18px] mr-2"
              src="https://images.bewakoof.com/web/group-3-2x-1558356035.png"
              alt="google"
            />
            <h2>GOOGLE</h2>
          </div>
          <div className="flex items-center justify-center rounded-[6px] text-[#202020] font-extrabold h-[40px] w-[45%] border-[1px] border-[rgba(0,0,0,.2)]">
            <img
              className="w-[18px] h-[18px] mr-2"
              src="https://images.bewakoof.com/web/bi-facebook2x-1620886445.png"
              alt="facebook"
            />
            <h2>FACEBOOK</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
