import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/products.js";

const ProductRouter = Router();

ProductRouter.get("/products", getAllProducts);
ProductRouter.get("/products/:id", getProduct);
ProductRouter.post("/product", createProduct);
ProductRouter.put("/product/:id", updateProduct);
ProductRouter.delete("/product/:id", deleteProduct);

export default ProductRouter;