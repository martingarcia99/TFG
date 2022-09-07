import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore , connectFirestoreEmulator} from 'firebase/firestore';
import {initializeFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBflzJExVG3I6Vq2i3JpMGGx_53iFTdylM",
    authDomain: "assistancemanagementweb.firebaseapp.com",
    projectId: "assistancemanagementweb",
    storageBucket: "assistancemanagementweb.appspot.com",
    messagingSenderId: "680753831655",
    appId: "1:680753831655:web:fe40623ccf0425ab404c42",
    measurementId: "G-VZRKGQJWPR"
  };

const app = initializeApp(firebaseConfig)
const auth = getAuth()
//const db = getFirestore()
//connectFirestoreEmulator(app, 'localhost', 8081);
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

export {
    auth,db
}