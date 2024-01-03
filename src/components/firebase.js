// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth" 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAliZ94khLwM_LL-BJ39GAKZ6f4pHZ9FE",
  authDomain: "wig-app-fb65e.firebaseapp.com",
  projectId: "wig-app-fb65e",
  storageBucket: "wig-app-fb65e.appspot.com",
  messagingSenderId: "488398149221",
  appId: "1:488398149221:web:9fcb15f93f3417d958588c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export {auth, db, storage};