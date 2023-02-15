import React, { createContext, useContext, useState } from "react";

const APIContext = createContext();

const APIProvider = ({ children }) => {
  const host = "https://shukla-apis.glitch.me";

  // verifying user by sending verification link through email
  const [recipEmailState, setRecipEmailState] = useState("");
  const [otpToVerify, setOtpToVerify] = useState(1234);
  const sendOtpMail = async () => {
    let otpCode = Math.floor(1000 + Math.random() * 9000); // 4 digit random number
    const response = await fetch(`${host}/api/mail/verify/${recipEmailState}`, {
      method: "GET",
      headers: {
        otpcode: otpCode,
      },
    });
    const json = await response.json();
    console.log(json);
    setOtpToVerify(otpCode);
  };

  return (
    <APIContext.Provider
      value={{
        sendOtpMail,
        otpToVerify,
        recipEmailState,setRecipEmailState
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export const APIState = () => {
  return useContext(APIContext);
};

export default APIProvider;
