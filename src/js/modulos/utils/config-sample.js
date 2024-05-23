import { initializeApp } from "firebase/app";//"https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

function getApp(){
    return initializeApp(firebaseConfig);
}

export {getApp};