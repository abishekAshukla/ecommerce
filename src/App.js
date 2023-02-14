import { useState } from "react";
import Navbar from "./Components/UI/Navbar";
import Login from "./Components/Login Page/Login";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import "./App.css";
import { auth } from "./firebase-config";

function App() {
  const provider = new GoogleAuthProvider(); //
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const register = async () => {
    try {
      const tempUser = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setUserEmail(tempUser.user.email);
      console.log(tempUser);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const login = async () => {
    try {
      const tempUser = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setUserEmail(tempUser.user.email);
      console.log(tempUser);
    } catch (error) {
      alert(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserEmail("");
    } catch (error) {
      alert(error.message);
    }
  };

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        const user = result.user;
        console.log(user);
        setUserEmail(user.email);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div>
      <Navbar/>
      <Login/>

      {/* <h1 className="text-3xl font-bold underline text-blue-500">Hello world!</h1>
      <h3> Register User </h3>
      <input
        placeholder="Email..."
        value={registerEmail}
        onChange={(event) => {
          setRegisterEmail(event.target.value);
        }}
      />
      <input
        placeholder="Password..."
        onChange={(event) => {
          setRegisterPassword(event.target.value);
        }}
      />
      <button onClick={register}> Create User</button>
      <h4> User Logged In: </h4>
      {userEmail}

      <button onClick={logout}> Sign Out </button>
      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={login}> Login</button>
      </div>
      <button onClick={signInWithGoogle}>Sign In With Google</button>

      <hr /> */}
    </div>
  );
}

export default App;
