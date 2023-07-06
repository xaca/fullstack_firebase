import {getDatabase, ref, onValue} from "firebase/database";
import {getApp} from "../utils/config";
import {leerDatos} from "../utils/json_utils";
import {iniciarlizarPaginador} from "../ui/paginador";
import { pintarMenu } from "../ui/menu";

const app = getApp();
const db = getDatabase();
let galeria;
let datos;

window.onload = ()=>{
    
    galeria = document.getElementById("galeria");

    if(galeria)
    {
        pintarMenu();
        
        onValue(ref(db, '/productos'), 
        (snapshot) => {
            //console.table(snapshot.val());
            //console.log(snapshot.val());
            procesarDatos(snapshot.val());
        });
    }
}

function procesarDatos(data){
    datos = leerDatos(data);
    iniciarlizarPaginador({
        datos:datos,
        pintarPagina:pintarPagina
    });
}

function pintarPagina(datos_pagina){
    let html = "";
    let no_image = "https://icons.iconarchive.com/icons/fatcow/farm-fresh/32/no-image-icon.png";
    let datos = datos_pagina;
    for(var i in datos)
    {
        html += `<div class="producto">
        <div>
            <h1>${datos[i].nombre}</h1>
            <p>${datos[i].descripcion?datos[i].descripcion:""}</p>
        </div>
        <div>
            <img src="${datos[i].url?datos[i].url:no_image}" />
        </div>
        </div>`;
    }
    
    galeria.innerHTML = html;
}