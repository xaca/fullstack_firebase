import { UUID } from "./uuid";//"https://unpkg.com/uuidjs@^5";

function frmToObj(myFormData){
    const formDataObj = {};
    myFormData.forEach(
        (value, key) => (formDataObj[key] = value)
    );
    return formDataObj;
}

function leerDatos(data)
{
    let resultado = [];
    for(var i in data)
    {
        data[i].id = i;
        resultado.push(data[i]);
    }
    return resultado;
}

function getUUID(){
    return UUID.generate();
}

export {frmToObj,getUUID,leerDatos};