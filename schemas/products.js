import mongoose, { Schema } from "mongoose";

export const ProductsSchema = new Schema({
  id: { type: Number, require: true },
  name_product: { type: String, require: true },
  description_product: { type: String, require: true },
  category: { type: String, require: true },
  price: { type: Number, require: true },
  stock: { type: Number, require: true },
  available: { type: Boolean, require: true, default: true },
  imgUrl: { type: String },
});

ProductsSchema.methods.setImageUrl = function setImageUrl(filename) {
  this.imgUrl = `http://localhost:3100/public/${filename}`;
};

const Product = mongoose.model("Product", ProductsSchema);
export default Product;