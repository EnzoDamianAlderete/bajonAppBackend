import mongoose, {model , Schema } from "mongoose";

export const OrderSchema = new Schema({
    name_user:{type: String, require: true},
    price:{type: Number, require: true},
    number_table:{type: Number, require: true},
    date: { type: Date, default: Date.now },
    completed:{type: Boolean, require: true, default: false},
    products:[{
        type: Schema.Types.ObjectId,
        ref:'Product'
    }]
});

const Order = mongoose.model("Order",OrderSchema);
export default Order;