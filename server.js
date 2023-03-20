import express from 'express';
import UserRouter from './routes/user.routes.js';
import ProductRouter from './routes/products.routes.js';
import db from './db.js';
import OrderRouter from './routes/order.routes.js';
import config from "./config.js";
import cors from "cors"

const app = express();

const PORT = config.SERVER_PORT;

//middlewares
app.use(cors());
app.use(express.json());
app.use(UserRouter);
app.use(ProductRouter);
app.use(OrderRouter);


app.listen( PORT, ()=>{
    console.log(`Servido correctamente en el puerto ${PORT}`);
    db();
}
);