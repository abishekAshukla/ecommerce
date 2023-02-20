import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpScreen from "../UI/OtpScreen";
import Loader from "../UI/Loader";
import { db } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { auth } from "../../firebase-config";
import { APIState } from "../contexts/Apis";
import { AppState } from "../contexts/Context";
import "./login.css";

const Login = () => {
  const { sendOtpMail, recipEmailState, setRecipEmailState } = APIState();
  const { stage, setStage, showLoaderFul, setShowLoaderFul } = AppState();
  let navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const usersCollectionRef = collection(db, "users");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [currentUser, setCurrentUser] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const getUserInfo = async (email) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    setShowLoaderFul(true);
    const querySnapshot = await getDocs(q);
    setShowLoaderFul(false);
    const userData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))[0];
    if (userData !== undefined) {
      console.log("hello");
      const jsonString = JSON.stringify(userData);
      localStorage.setItem("userInfo", jsonString);
    }
    return userData;
  };

  const createUser = async (fName, lName, email, gender) => {
    if (fName !== "" && lName !== "") {
      setShowLoaderFul(true);
      await addDoc(usersCollectionRef, {
        email: email,
        firstName: fName,
        gender: gender,
        lastName: lName,
      });
      setShowLoaderFul(false);
    } else {
      alert("Please enter valid information");
    }
  };

  const signup = async () => {
    if (firstName !== "" && lastName !== "") {
      try {
        setShowLoaderFul(true);
        const tempUser = await createUserWithEmailAndPassword(
          auth,
          recipEmailState,
          password
        );
        setShowLoaderFul(false);
        createUser(firstName, lastName, recipEmailState, gender);
        await getUserInfo(recipEmailState);
        setCurrentUser(tempUser.user.email);
        // console.log(tempUser);
        navigate("/");
        window.scrollTo(0, 0);
      } catch (error) {
        setShowLoaderFul(false);
        alert(error.message);
      }
    } else {
      alert("Please enter valid information");
    }
  };

  const login = async () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(recipEmailState) == true && password !== "") {
      try {
        setShowLoaderFul(true);
        const tempUser = await signInWithEmailAndPassword(
          auth,
          recipEmailState,
          password
        );
        setShowLoaderFul(false);
        getUserInfo(recipEmailState);
        setCurrentUser(tempUser.user.email);
        // console.log(tempUser);
        navigate("/");
        window.scrollTo(0, 0);
      } catch (error) {
        setShowLoaderFul(false);
        console.log(error.message);
        if (error.message === "Firebase: Error (auth/user-not-found).") {
          setStage(1);
        } else {
          alert(error.message.slice(17, -2));
        }
      }
    } else {
      alert("Please enter valid email and password");
    }
  };

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // console.log(credential);
        const user = result.user;
        // console.log(user);
        const userData = await getUserInfo(user.email);
        // console.log(userData);
        if (userData === undefined) {
          createUser("undefined", "undefined", user.email, "undefined");
          getUserInfo(user.email);
          navigate("/");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // console.log(result);
        // console.log(result.user.email);
        const userData = await getUserInfo(result.user.email);
        // console.log(userData);
        if (userData === undefined) {
          createUser("undefined", "undefined", result.user.email, "undefined");
          getUserInfo(result.user.email);
          navigate("/");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  const sendOTP = async () => {
    setStage(2);
    setShowLoader(true);
    await sendOtpMail();
    setShowLoader(false);
  };

  return (
    <div className="login  bg-blue-300 mt-[52px] flex">
      <div className="welcome-login w-[50%] h-[95vh] flex flex-col justify-between items-center py-10">
        <h2 className="text-[20px] font-extrabold text-center">
          Welcome to the world of Coverly!
        </h2>
        <div>
          <img
            src="https://images.bewakoof.com/web/group-19-1617704502.png"
            alt="Welcome Image"
          />
        </div>
      </div>

      {/* Login */}
      <div
        style={{ display: stage === 0 ? "" : "none" }}
        className="credentials bg-white h-[95vh] w-[50%] flex flex-col items-center justify-center py-2"
      >
        <h1>{currentUser}</h1>
        <h1 className="text-[24px] font-extrabold">Log in / Sign up</h1>
        <h2 className="text-[18px] text-[#A0A0A0] mt-3 font-semibold text-center">
          for Latest trends, exciting offers and everything in Coverly!
        </h2>
        <input
          className="mt-3 border-2 border-[rgba(0,0,0,.2)] md:w-[60%] w-[90%] h-14 placeholder:text-black placeholder:font-extrabold rounded"
          type="text"
          placeholder="  Enter Email"
          autoComplete="off"
          value={recipEmailState}
          onChange={(e) => {
            setRecipEmailState(e.target.value);
          }}
        />
        <input
          className="mt-5 border-2 border-[rgba(0,0,0,.2)] md:w-[60%] w-[90%] h-14 placeholder:text-black placeholder:font-extrabold rounded"
          type="password"
          name="password"
          placeholder="  Enter Password"
          autoComplete="off"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") login(recipEmailState, password);
          }}
        />
        <button
          className="mt-5 bg-[#42A2A2] text-[20px] text-white md:w-[60%] w-[90%] h-14 rounded font-bold"
          onClick={() => {
            login();
          }}
        >
          CONTINUE
        </button>
        <h2 className="text-[16px] mt-3 font-semibold text-center">OR</h2>
        <div className="flex md:w-[60%] w-[90%] justify-between">
          <div
            onClick={signInWithGoogle}
            className="flex items-center justify-center rounded-[6px] text-[#202020] font-extrabold h-[40px] w-[45%] border-[1px] border-[rgba(0,0,0,.2)]"
          >
            <img
              className="w-[18px] h-[18px] mr-2"
              src="https://images.bewakoof.com/web/group-3-2x-1558356035.png"
              alt="google"
            />
            <h2>GOOGLE</h2>
          </div>
          <div
            onClick={signInWithFacebook}
            className="flex items-center justify-center rounded-[6px] text-[#202020] font-extrabold h-[40px] w-[45%] border-[1px] border-[rgba(0,0,0,.2)]"
          >
            <img
              className="w-[18px] h-[18px] mr-2"
              src="https://images.bewakoof.com/web/bi-facebook2x-1620886445.png"
              alt="facebook"
            />
            <h2>FACEBOOK</h2>
          </div>
        </div>
      </div>

      {/* If credentails are InValid */}
      <div
        style={{ display: stage === 1 ? "" : "none" }}
        className="credentials bg-white h-[95vh] w-[50%] flex flex-col items-center justify-center py-2"
      >
        <h1 className="text-[24px] font-extrabold text-center">
          User does not exists with this Email
        </h1>
        <button
          className="mt-5 bg-[#42A2A2] text-[18px] text-white md:w-[60%] w-[90%] h-14 rounded font-bold"
          onClick={() => {
            setStage(0);
            setRecipEmailState("");
            setPassword("");
          }}
        >
          ENTER ANOTHER EMAIL
        </button>
        <button
          className="mt-5 bg-[#42A2A2] text-[18px] text-white md:w-[60%] w-[90%] h-14 rounded font-bold"
          onClick={sendOTP}
        >
          CONTINUE WITH SIGN UP
        </button>
      </div>

      {/* OTP Screen */}
      <div
        style={{ display: stage === 2 ? "" : "none" }}
        className="credentials bg-white h-[95vh] w-[50%] flex flex-col items-center justify-center py-2"
      >
        <div style={{ display: showLoader == true ? "none" : "" }}>
          <OtpScreen />
        </div>
        <div style={{ display: showLoader == true ? "" : "none" }}>
          <Loader />
        </div>
      </div>

      {/* SignUp */}
      <div
        style={{ display: stage === 3 ? "" : "none" }}
        className="credentials bg-white h-[95vh] w-[50%] flex flex-col items-center  justify-center py-2"
      >
        <h1>{currentUser}</h1>
        <h1 className="text-[24px] font-extrabold">Sign up</h1>
        <input
          className="mt-3 border-b-2 border-[rgba(0,0,0,.2)] md:w-[60%] w-[90%] h-14 placeholder:text-black placeholder:font-extrabold rounded"
          type="text"
          placeholder="  First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          className="mt-3 border-b-2 border-[rgba(0,0,0,.2)] md:w-[60%] w-[90%] h-14 placeholder:text-black placeholder:font-extrabold rounded"
          type="text"
          placeholder="  Last Name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <input
          className="mt-3 border-b-2 border-[rgba(0,0,0,.2)] md:w-[60%] w-[90%] h-14 placeholder:text-black placeholder:font-extrabold rounded"
          type="text"
          placeholder="  Email"
          value={recipEmailState}
          onChange={(e) => {
            setRecipEmailState(e.target.value);
          }}
        />
        <input
          className="mt-5 border-b-2 border-[rgba(0,0,0,.2)] md:w-[60%] w-[90%] h-14 placeholder:text-black placeholder:font-extrabold rounded"
          type="password"
          name="password"
          placeholder="  Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="mt-5 md:w-[60%] w-[90%]">
          <p>Gender</p>
          <div className="flex">
            <button
              style={{ background: gender === "male" ? "#FFD835" : "white" }}
              className="text-black font-extrabold px-5 py-1 border-[1px] border-black"
              onClick={() => {
                setGender("male");
              }}
            >
              Male
            </button>
            <button
              style={{ background: gender === "female" ? "#FFD835" : "white" }}
              className=" text-black font-extrabold px-5 py-1 border-[1px] border-black border-l-[0px]"
              onClick={() => {
                setGender("female");
              }}
            >
              Female
            </button>
          </div>
        </div>
        <button
          className="mt-5 bg-[#42A2A2] text-[20px] text-white md:w-[60%] w-[90%] h-14 rounded font-bold"
          onClick={signup}
        >
          SAVE CHANGES
        </button>
      </div>
    </div>
  );
};

export default Login;
