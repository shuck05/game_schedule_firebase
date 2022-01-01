import { initializeApp } from "firebase/app";
import firebaseConfig from "./FirebaseConfig";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
export { db, auth, firebaseApp };
