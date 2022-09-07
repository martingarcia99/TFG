import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBflzJExVG3I6Vq2i3JpMGGx_53iFTdylM",
    authDomain: "assistancemanagementweb.firebaseapp.com",
    projectId: "assistancemanagementweb",
    storageBucket: "assistancemanagementweb.appspot.com",
    messagingSenderId: "680753831655",
    appId: "1:680753831655:web:fe40623ccf0425ab404c42",
    measurementId: "G-VZRKGQJWPR"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
