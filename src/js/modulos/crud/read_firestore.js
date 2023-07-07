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
            console.log(`${doc.id} => ${doc.data()}`);
        });
    }
}