import express from 'express';
import UserRouter from './routes/user.routes.js';
import ProductRouter from './routes/products.routes.js';
import db from './db.js';
import OrderRouter from './routes/order.routes.js';
import config from "./config.js";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import AdminRouter from './routes/admin.routes.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

const PORT = config.SERVER_PORT;

//middlewares
app.use(cors());
app.use(express.json());

app.use('/public', express.static(`${__dirname}/storage/imgs`));

//Routes
app.use(UserRouter);
app.use(AdminRouter);
app.use(ProductRouter);
app.use(OrderRouter);


app.listen( PORT, ()=>{
    console.log(`Servido correctamente en el puerto ${PORT}`);
    db();
    console.log(JSON.stringify(config));
}
).on("error",function(error){
    console.log("algo salio mal", error);
})