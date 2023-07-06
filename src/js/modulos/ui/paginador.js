let cantidad_pagina = 4;
let total_paginas = 0;
let pagina_actual = 0;
let datos, pintarPagina;

function extraerResultados(obj){

    let pagina = obj.pagina_actual;
    let inicio = (pagina-1)*cantidad_pagina;
    let fin; 
    let resultado = [];

    if((inicio+total_paginas)<=datos.length)
    {
        fin = inicio+cantidad_pagina;
    }
    else
    {
        fin = datos.length;
    }
    console.log(inicio,fin);
    for(var i=inicio;i<fin;i++)
    {
        resultado.push(datos[i]);
    }

    return resultado;
}

function calcularPaginas(){
   let paginas;
   if(datos.length>cantidad_pagina){
       if(datos.length % cantidad_pagina==0)
       {
            paginas = datos.length/cantidad_pagina; 
       }
       else
       {
            paginas = Math.trunc(datos.length/cantidad_pagina)+1;
       }
       return paginas;
   }
   return 0;
}

function iniciarlizarPaginador(obj){
    datos = obj.datos;
    pintarPagina = obj.pintarPagina;
    
    total_paginas = calcularPaginas(datos);
    
    if(total_paginas>1)
    {
        actualizarPagina({
            pagina_actual:1
        });
    }
    else
    {
        pintarPagina(datos);
    }
}

function cambiarPagina(pagina){
    actualizarPagina({
        pagina_actual:pagina
    });
}

function siguiente(){
    //TODO:Agregar logica de quitar la flecha si es la ultima
    actualizarPagina({
        pagina_actual:(pagina+1<=total_paginas)?pagina+1:pagina
    });
}

function atras(){
    //TODO:Agregar logica de quitar la flecha si es la primera
    actualizarPagina({
        pagina_actual:(pagina-1>0)?pagina-1:1
    });
}

function actualizarPagina(obj){
    let datos_pagina;
    datos_pagina = extraerResultados(obj);
    pintarPagina(datos_pagina);

    imprimirPaginador({
        total:total_paginas,
        pagina_actual:obj.pagina_actual
    });
}
function asignarEventosPaginador(){
    let enlaces = document.getElementsByClassName("enlace");
    for(var i in enlaces)
    {
        //console.log(parseInt(i),i,typeof parseInt(i));
        //console.log(parseInt(i),typeof parseInt(i),typeof parseInt(i) != NaN)
        if(!isNaN(parseInt(i)))
        {
            enlaces[i].addEventListener("click",(event)=>{
                //console.dir(event.target.attributes.pagina.value);
                let pagina = event.target.attributes.pagina.value;
                actualizarPagina({
                    pagina_actual:pagina
                });
            });
        }
    }
}           
function imprimirPaginador(obj)
{
    let paginador = document.getElementById("paginador");
    let html = `<div>
                    <a href="javascript:void(0);"
                    class="atras">&lt;</a> `;
    for(var i=1;i<=obj.total;i++)
    {
        html +=` <a href="javascript:void(0);" 
                  pagina="${i}" 
                  class="enlace ${i==obj.pagina_actual?"seleccionado":""}">${i}</a>`;
    }
    html += ` <a "javascript:void(0);"
              class="adelante">&gt;</a></div>`;
    paginador.innerHTML = html;
    asignarEventosPaginador();
}

export {iniciarlizarPaginador};