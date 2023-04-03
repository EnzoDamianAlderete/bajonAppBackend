import mongoose, { Schema } from "mongoose";

export const OrderSchema = new Schema({
  name_user: { type: String, require: true },
  price: { type: Number, require: true }, //precio total del pedido
  number_table: { type: Number, require: true },
  date: { type: Date, default: Date.now },
  completed: { type: Boolean, require: true, default: false },
  //to do . aca tiene q guardar el pedido con precio y cantidad de cada producto
  detalle_pedido: [
    {
      producto: { type: Schema.Types.ObjectId, ref: "Product" },
      cantidad: { type: Number },
    },
  ],
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
