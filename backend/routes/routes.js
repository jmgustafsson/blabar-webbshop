// import express
import express from "express";

// import function from controller
import { showProducts, createProduct } from "../controllers/product.js";

// init express router
const router = express.Router();

// Get All Product
router.get("/products", showProducts);

// Create New Product
router.post("/products", createProduct);

export default router;