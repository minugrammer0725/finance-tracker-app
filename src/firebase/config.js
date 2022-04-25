import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDs7gKZKsW8w3S0ey9tfl3jF76q3bYt470",
  authDomain: "finance-tracker-3aad5.firebaseapp.com",
  projectId: "finance-tracker-3aad5",
  storageBucket: "finance-tracker-3aad5.appspot.com",
  messagingSenderId: "590413300358",
  appId: "1:590413300358:web:7e64d037fb3eeb0b910707",
};

// initialize firebase.
firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
