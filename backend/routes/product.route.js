import express from "express";
import { getProduct, postProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
const router = express.Router();

// GET all products
router.get('/', getProduct);

// CREATE a new product
router.post('/', postProduct);

// UPDATE a product by ID
router.put('/:id', updateProduct);

// DELETE a product by ID
router.delete('/:id', deleteProduct);

export default router;