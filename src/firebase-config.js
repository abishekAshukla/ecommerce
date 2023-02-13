import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkp9fU2PRzwZ0sDpMIu-P7P1dng0CjwaI",
  authDomain: "ecommerce-1a736.firebaseapp.com",
  projectId: "ecommerce-1a736",
  storageBucket: "ecommerce-1a736.appspot.com",
  messagingSenderId: "294935686149",
  appId: "1:294935686149:web:74ff6ad6c1c64ae7e5006c",
  measurementId: "G-X9REY8F2V9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
