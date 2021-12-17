import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJE8mN5IwJWVz1EFGRSEajLbRKPbEtfKU",

  authDomain: "gameschedule-cc151.firebaseapp.com",

  projectId: "gameschedule-cc151",

  storageBucket: "gameschedule-cc151.appspot.com",

  messagingSenderId: "74994871723",

  appId: "1:74994871723:web:c91500d26c7f8e8748f6ee",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
