import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCFfXgjd3npVsbUfDyY18k0HjaIuFu5JBU",
  authDomain: "book-bug-17cfa.firebaseapp.com",
  projectId: "book-bug-17cfa",
  storageBucket: "book-bug-17cfa.appspot.com",
  messagingSenderId: "912007186640",
  appId: "1:912007186640:web:2407f51da280fab9b9b6d5",
  measurementId: "G-SZMY0HFHV2",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
