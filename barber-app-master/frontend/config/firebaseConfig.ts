import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjFPSjbbvuO7pKU8bXca0S-hTn16m3K0U",
  authDomain: "barberapp-59c64.firebaseapp.com",
  projectId: "barberapp-59c64",
  storageBucket: "barberapp-59c64.appspot.com",
  messagingSenderId: "711465378573",
  appId: "1:711465378573:web:43ff7627650d6cc0fc8644",
  measurementId: "G-NWTJQFMF5L",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
