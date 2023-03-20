import { Router } from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrder, updateOrder } from '../controllers/order.js';

const OrderRouter = Router();

OrderRouter.get("/orders", getAllOrders);
OrderRouter.get("/orders/:id", getOrder);
OrderRouter.post("/orders", createOrder);
OrderRouter.put("/orders/:id", updateOrder);
OrderRouter.delete("/orders/:id", deleteOrder);

export default OrderRouter;