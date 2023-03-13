import { Router } from 'express';
import { createOrder, getAllOrders } from '../controllers/order.js';

const OrderRouter = Router();

OrderRouter.get("/orders", getAllOrders);
OrderRouter.post("/orders", createOrder);

export default OrderRouter;