import { Router } from "express";
import upload from "../libs/storage.js";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/products.js";

const ProductRouter = Router();

ProductRouter.get("/products", getAllProducts);
ProductRouter.get("/products/:id", getProduct);
ProductRouter.post("/product", upload.single('image') ,createProduct);
ProductRouter.put("/product/:id", updateProduct);
ProductRouter.delete("/product/:id", deleteProduct);

export default ProductRouter;