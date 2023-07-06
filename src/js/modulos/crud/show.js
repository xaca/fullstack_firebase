import { getApp } from "../utils/config";
import {getDatabase, ref, update,set} from "firebase/database";
import { frmToObj } from "../utils/json_utils";
import { pintarMenu } from "../ui/menu";

const app = getApp();
const db = getDatabase();
let obj, btn_cancelar,btn_actualizar;

window.onload = ()=>{
    obj = localStorage.getItem("producto_actual");
    
    if(obj)
    {
        pintarMenu();
        pintarDatos(JSON.parse(obj));
        
        btn_cancelar = document.getElementById("btn_cancelar");
        btn_cancelar.addEventListener("click",()=>{
            location.href = "update.html";
        });

        btn_actualizar = document.getElementById("btn_actualizar");
        btn_actualizar.addEventListener("click",(event)=>{
            event.preventDefault();

            let frm = document.getElementById("frm_producto");
            let obj = new FormData(frm);
            //obj.append("url",image_url);
            actualizarProducto(obj);
    
        });
    }
    else
    {
        location.href = "/";
    }
}

function actualizarProducto(formData){
    const db = getDatabase();
    const obj = frmToObj(formData);
    /*
    {
        id:obj.id_producto
        nombre: obj.nombre,
        descripcion: obj.descripcion,
        cantidad : obj.cantidad,
        precio:obj.precio,
        url:obj.url
    }
    */
    //console.table(obj);return;
    update(ref(db, `productos/${obj.id}`), obj)
    .then(()=>{
        alert("Producto actualizado");
        location.href = "update.html";
    });
}

/*
{"descripcion":"Torta de novia","nombre":"Torta","url":"https://icons.iconarchive.com/icons/iconarchive/mothers-day/128/Mothers-Day-Cake-icon.png"}
*/
function pintarDatos(obj){
    let contenedor = document.getElementById("edicion");
    let html = `<form id="frm_producto">
                <div class='container text-center'>
                    <h2 class="row">Formulario de actualización</h2>
                <div class='row'>`;
    html+= `
                <div class="col">
                    <img class="rounded mx-auto d-block" src="${obj.url}">
                    <input type="hidden" name="id" id="id" value="${obj.id}">
                    <!--<input type="file" class="btn" name="" id="">-->
                </div>
            
                <div class="col">
                    <h2>Nombre producto</h2>
                    <input type="text" name="nombre" id="nombre" value="${obj.nombre}" />

                    <h2>Descripción:</h2>
                    <textarea name="descripcion" id="descripcion">${obj.descripcion?obj.descripcion:""}</textarea>
                </div>
            
            </div>`;
    html+= `<div class="row">
                <div class="col">
                <input type="button" id="btn_actualizar" class="btn btn-success" value="Actualizar" />
                <input type="button" id="btn_cancelar" class="btn btn-danger" value="Cancelar" />    
                </div>
            </div>`;
    html+= `</div></form>`;
    //document.write(html); Ojo, esto sobreescribe el body y deshabilita boostrap
    contenedor.innerHTML = html;
}