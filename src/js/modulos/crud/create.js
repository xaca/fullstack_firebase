import {pintarMenu,onCerrarSesion} from "../ui/menu";
import { getApp } from "../utils/config";
import { frmToObj,getUUID } from "../utils/json_utils";
// Import the functions you need from the SDKs you need
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";//"https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
//import {getAuth,onAuthStateChanged,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getDatabase, ref as _ref,set } from "firebase/database"; //"https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const app = getApp();
const storage = getStorage();
let uuid;

window.onload = ()=>{

    const btn_enviar = document.getElementById("btn_enviar");
    btn_enviar.addEventListener("click", enviarDatos);
    pintarMenu();
}

function crearProducto(formData) {
    const db = getDatabase();
    const obj = frmToObj(formData);
    /*
    {
        nombre: obj.nombre,
        descripcion: obj.descripcion,
        cantidad : obj.cantidad,
        precio:obj.precio,
        url:obj.url
    }
    */
    set(_ref(db, `productos/${uuid}`), obj)
    .then(()=>{
        resetCampos();
        alert("Producto creado");
    });
}

function resetCampos(){
    let campos = ["nombre", "descripcion", "cantidad", "precio", "archivo_imagen"];
    let temp;
    for(var i in campos){
        temp = document.getElementById(campos[i]);
        temp.value="";
    }
}

function enviarDatos(event) {
    event.preventDefault();
    new Promise(subirImagen).then((image_url)=>{
        let frm = document.getElementById("frm_producto");
        let obj = new FormData(frm);
        obj.append("url",image_url);
        crearProducto(obj);
    });
}

function subirImagen(resolve,reject){
    uuid = getUUID();
    const storageRef = ref(storage,`images/${uuid}`);
    const archivo_imagen = document.getElementById("archivo_imagen");
    const fileList = archivo_imagen.files; /* now you can work with the file list */
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, fileList[0]).then((snapshot) => {
        getDownloadURL(snapshot.ref).
        then((downloadURL) => {
            resolve(downloadURL);
        });
    });
}