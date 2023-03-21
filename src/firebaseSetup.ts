
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth" // New import
import { getFirestore, initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBNzB2oMy_45H_xcTSKjhaq-6JxJauuDgA",

    authDomain: "sklad3-33676.firebaseapp.com",
  
    projectId: "sklad3-33676",
  
    storageBucket: "sklad3-33676.appspot.com",

    messagingSenderId: "764039659582",
    appId: "1:764039659582:web:2439da1b1f8940da83d16f"
  
}; //this is where your firebase app values you copied will go
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app)
export default app