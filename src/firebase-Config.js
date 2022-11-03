import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGIJOobYu4m-PaKfHEgXMz4oUgA0iZcXM",
  authDomain: "clone-8579b.firebaseapp.com",
  projectId: "clone-8579b",
  storageBucket: "clone-8579b.appspot.com",
  messagingSenderId: "640077699545",
  appId: "1:640077699545:web:d8576b026e7c0cffca21c8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
