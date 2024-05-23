import { pintarMenu } from "../ui/menu";
import { getApp } from "../utils/config";
import { leerDatos } from "../utils/json_utils";
import {getDatabase, ref, onValue,remove} from "firebase/database";//"https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const app = getApp();
const db = getDatabase();
let galeria;
let datos;

window.onload = ()=>{
    
    galeria = document.getElementById("galeria");
    pintarMenu();

    if(galeria)
    {
        onValue(ref(db, '/productos'), 
        (snapshot) => {
            console.table(snapshot.val());
            //console.log(snapshot.val());
            procesarDatos(snapshot.val());
        });
    }
}

function asignarEventosActualizar(){
    let enlaces = document.getElementsByClassName("btn_actualizar");
    for(var i in enlaces)
    {
        //console.log(parseInt(i),i,typeof parseInt(i));
        //console.log(parseInt(i),typeof parseInt(i),typeof parseInt(i) != NaN)
        if(!isNaN(parseInt(i)))
        {
            enlaces[i].addEventListener("click",(event)=>{
                //console.dir(event.target.attributes.pagina.value);
                let id_producto = event.target.attributes.id_producto.value;
                
                localStorage.setItem("producto_actual",
                                    JSON.stringify(datos[id_producto]));
                location.href = "show.html"; 
                //console.table(datos[id_producto]);
            });
        }
    }
}     

function asignarEventosBorrar(){
    let enlaces = document.getElementsByClassName("btn_borrar");
    for(var i in enlaces)
    {
        //console.log(parseInt(i),i,typeof parseInt(i));
        //console.log(parseInt(i),typeof parseInt(i),typeof parseInt(i) != NaN)
        if(!isNaN(parseInt(i)))
        {
            enlaces[i].addEventListener("click",(event)=>{
                //console.dir(event.target.attributes.pagina.value);
                let id_producto = event.target.attributes.id_producto.value;
                //datos[id_producto].id_producto = id_producto;
                //console.table(datos[id_producto]);
                let respuesta = prompt("¿Seguro que quiere borrar?, escriba si para confirmar");
                respuesta = (respuesta)?respuesta.toLowerCase():"";
                if(respuesta=="si")
                {
                    remove(ref(db, `productos/${id_producto}`))
                    .then(()=>{
                        alert("Producto borrado");
                        //location.reload();
                    });
                }
                
            });
        }
    }
}     

function procesarDatos(data){
    datos = leerDatos(data);
    //localStorage.setItem("datos",JSON.stringify(datos));
    pintarDatos();
    asignarEventosActualizar();
    asignarEventosBorrar();
}

function pintarDatos(){

    let html = `<section class="container">`;
    let no_image = "https://icons.iconarchive.com/icons/fatcow/farm-fresh/32/no-image-icon.png";
    
    for(var i in datos){
        html+=`<div class="row align-items-center">
            <span class="col">
                <img src="${datos[i].url?datos[i].url:no_image}" alt="">
            </span>
            <span class="col">${datos[i].nombre}</span>
            <span class="col">${datos[i].descripcion?datos[i].descripcion:""}</span>
            <span class="col">
                <input type="button" id_producto="${i}" class="btn btn-secondary btn_actualizar" value="Actualizar">
                <input type="button" id_producto="${datos[i].id}" class="btn btn-danger btn_borrar" value="Borrar">
            </span>
        </div>`;
    }
    html+=`</section>`;
    galeria.innerHTML = html;
    //document.write = "hola";
}