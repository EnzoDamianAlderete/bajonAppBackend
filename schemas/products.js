import mongoose, {Schema} from "mongoose";

export const ProductSschema = new Schema({
    id:{type: Number, require: true},
    name_product:{type: String, require: true},
    description_product:{type: String, require: true},
    category:{type: String, require: true},
    price:{type: Number, require: true},
    stock:{type: Number, require: true},
    deleted:{type: Boolean, require: true, default: false},
});

const Product = mongoose.model("Product",ProductSschema);
export default Product;