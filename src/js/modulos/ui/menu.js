import { getApp } from "../utils/config";
import { getAuth,onAuthStateChanged,signOut} from "firebase/auth";

let btn_login, btn_registro, btn_perfil, btn_logout;
let usuario, menu_iniciado = false;

// Initialize Firebase
const app = getApp();
const auth = getAuth();

function asignarEventos()
{
    /*btn_login = document.getElementById("btn_login");
    btn_registro = document.getElementById("btn_registro");
    btn_perfil = document.getElementById("btn_perfil");*/
    btn_logout = document.getElementById("btn_logout");
    if(btn_logout)
    {
        btn_logout.addEventListener("click",cerrarSesion);
    }
}

function iniciarMenu(){
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            usuario = user;
        } else {
            // User is signed out
            usuario = undefined;
        }
        pintarMenu();
    });
    menu_iniciado = true;
}

function cerrarSesion(event){
    signOut(auth).then(() => {
      // Sign-out successful.
      usuario = undefined;
      pintarMenu();
    }).catch((error) => {
    // An error happened.
      console.log(error);
    });
  }

function pintarMenu(){
    let menu = document.getElementById("menu");
    let html = `<a href="index.html" id="btn_home" class="btn btn-light rounded-pill">Home</a>
    <a href="contacto.html" id="btn_contacto" class="btn btn-light rounded-pill">Contacto</a>
    <a href="read.html" id="btn_leer" class="btn btn-light rounded-pill">Leer</a>`;

    if(usuario)
    {
        html += menuLogueado();
    }
    else{

        html += menuSinLogueo();
    }
    console.table(usuario);
    if(menu){
        menu.innerHTML = html;
        asignarEventos();
        if(!menu_iniciado)
        {
            iniciarMenu();
        }
    }
    
}

function menuSinLogueo(){
    let html = `<a href="login.html" id="btn_login" class="btn btn-light rounded-pill ">Login</a>
    <a href="registro.html" id="btn_registro" class="btn btn-light rounded-pill ">Registro</a>`;
    return html;
}

function menuLogueado(){
    let html = `
    <a href="create.html" id="btn_crear" class="btn btn-light rounded-pill">Crear</a>
    <a href="update.html" id="btn_update" class="btn btn-light rounded-pill">Actualizar</a>
    <a href="perfil.html" id="btn_perfil" class="btn btn-light rounded-pill">Perfil</a>
    <a href="logout.html" id="btn_logout" class="btn btn-light rounded-pill">Cerrar Sesión</a>`;
    return html;
}

export {pintarMenu};