// Import the functions you need from the SDKs you need
import { getApp } from "../utils/config";
import { pintarMenu } from "../ui/menu";
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth";

// Initialize Firebase
const app = getApp();
const auth = getAuth();
let txt_email, txt_clave, btn_enviar;

window.onload = ()=>{
    txt_email = document.getElementById("txt_email");
    txt_clave = document.getElementById("txt_clave");
    btn_enviar = document.getElementById("btn_enviar");

    pintarMenu();
    btn_enviar.addEventListener("click",registro);
}

function registro(){

    createUserWithEmailAndPassword(auth, txt_email.value, txt_clave.value)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        location.href = "index.html";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
    });
}