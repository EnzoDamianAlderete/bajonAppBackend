import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/products.js";

const ProductRouter = Router();

ProductRouter.get("/products", getAllProducts);
ProductRouter.post("/product", createProduct);
ProductRouter.put("/product/:id", updateProduct);
ProductRouter.put("/product/delete/:id", deleteProduct);

export default ProductRouter;