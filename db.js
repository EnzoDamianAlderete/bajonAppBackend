import mongoose from "mongoose";
import config from "./config.js";

const DB_URL = config.DB_URL;

const db = async() =>{
    await mongoose
    .connect(DB_URL)
    .then(()=> console.log("Conexion a la db con exito"))
    .catch((error)=> console.log(error));
}

export default db;