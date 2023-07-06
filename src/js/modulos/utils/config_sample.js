import { initializeApp } from "firebase/app";//"https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";

/*
Para configurar correctamente el proyecto siga los siguientes pasos:
  - npm i (Instala las dependencias del proyecto)
  - renombre config_sample.js a config.js
  - Actualice el objeto firebaseConfig con los datos del proyecto creado en firebase
  - Ejecute npm run dev 
  - Ingrese a http://localhost:1234/
*/
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