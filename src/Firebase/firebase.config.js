import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD03lzH19LgPonIGiNsOXJ_4RSavOCfzbc",
  authDomain: "vista-shop.firebaseapp.com",
  projectId: "vista-shop",
  storageBucket: "vista-shop.appspot.com",
  messagingSenderId: "918218784105",
  appId: "1:918218784105:web:4db642b9c7bacd8cc0d1f8",
  measurementId: "G-PJTKWL83G7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
