import mongoose, {model , Schema } from "mongoose";

export const OrderSchema = new Schema({
    name_user:{type: String, require: true},
    price:{type: Number, require: true},
    number_table:{type: Number, require: true},
});

const Order = mongoose.model("Order",OrderSchema);
export default Order;