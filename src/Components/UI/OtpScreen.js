import { useState, useRef } from "react";
import { APIState } from "../contexts/Apis";
import { AppState } from "../contexts/Context";

function OtpScreen() {
  const { otpToVerify } = APIState();
  const { setStage } = AppState();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (event, index) => {
    const value = event.target.value;
    if (isNaN(value)) {
      return;
    }
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    if (value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      if (otp[index] !== "") {
        setOtp((prevOtp) => {
          const newOtp = [...prevOtp];
          newOtp[index] = "";
          return newOtp;
        });
        return;
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp == otpToVerify) {
    //   alert("Correct OTP");
        setStage(3);
    } else {
        alert("invalid OTP");
    }
    console.log(enteredOtp);
  };

  return (
    <div className="flex justify-center items-center w-[100%] h-[100%] mt-5">
      <form
        onSubmit={handleSubmit}
        className="w-[100%] h-[100%] flex flex-col justify-center items-center"
      >
        <h2 className="text-[24px] font-extrabold text-center">
          Enter OTP sent to your given Email
        </h2>
        <div className="flex items-center justify-between mb-6 mt-5">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(event) => handleChange(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="text-3xl w-16 h-16 border border-gray-300 rounded-lg text-center ml-2 mr-2"
            />
          ))}
        </div>
        <button className=" mt-5 bg-[#42A2A2] text-[18px] text-white md:w-[60%] w-[90%] h-14 rounded font-bold">
          Submit
        </button>
      </form>
    </div>
  );
}

export default OtpScreen;
