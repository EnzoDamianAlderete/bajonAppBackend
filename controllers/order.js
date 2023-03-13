import { response } from "express";
import Order from "../schemas/order.js";
import User from "../schemas/user.js";

 export const getAllOrders = async(req,res)=>{
    try {
        const orders = await Order.find({}).populate('products');
        res.json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
}

 export const createOrder = async(req,res)=>{
    const {name_user, price, number_table, userId} = req.body;

    const user = await User.findById(userId)

       if(!name_user ||!price||!number_table){
            return res.json({ mensaje:"Falta un campo por completar"});
        }else{
                    const newOrder = new Order({
                        name_user,
                        price,
                        number_table,
                        user:user._id
                    });

                    try {
                        const savedOrder = await newOrder.save()

                        user.orders = user.orders.concat(savedOrder._id)
                        await user.save()

                        res.json({ mensaje:"Orden tomanda correctamente", savedOrder});
                    } catch (error) {
                        console.error(error);
                    }
        }
}
