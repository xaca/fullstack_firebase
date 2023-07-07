import {getFirestore,collection, getDocs } from "firebase/firestore";
import {getApp} from "../utils/config";
import {leerDatos} from "../utils/json_utils";
import {iniciarlizarPaginador} from "../ui/paginador";
import { pintarMenu } from "../ui/menu";

let galeria;
let datos;
const app = getApp();
const db = getFirestore(app);

window.onload = async ()=>{
    
    galeria = document.getElementById("galeria");

    if(galeria)
    {
        pintarMenu();

        const querySnapshot = await getDocs(collection(db, "productos"));
        
        querySnapshot.forEach((doc) => {
            //`${doc.id} => ${doc.data()}`
            pintarPagina(doc.data());
            //let response = doc.data();
            //console.log(`${response.nombre} ${response.precio}`);
        });
    }
}

function pintarPagina(datos){
    let html;
    let no_image = "https://icons.iconarchive.com/icons/fatcow/farm-fresh/32/no-image-icon.png";
    
    html = `<div class="producto">
        <div>
            <h1>${datos.nombre}</h1>
            <p>${datos.descripcion?datos.descripcion:""}</p>
        </div>
        <div>
            <img src="${datos.url?datos.url:no_image}" />
        </div>
    </div>`;
    
    galeria.innerHTML = html;
}