// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIwBwBG6jFDAjoMSwr2kHyomyRLxXBaaQ",
  authDomain: "golftemp-ce06c.firebaseapp.com",
  databaseURL: "https://golftemp-ce06c.firebaseio.com",
  projectId: "golftemp-ce06c",
  storageBucket: "golftemp-ce06c.appspot.com",
  messagingSenderId: "8808231331",
  appId: "1:8808231331:web:7b5351ba70a8a8ec282a16",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const f = firebase.database().ref("CoachData/").orderByKey();

console.log(f);
