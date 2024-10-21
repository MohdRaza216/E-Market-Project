import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { Product } from './models/product.model.js';
import mongoose from 'mongoose';
const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();

app.use(express.json());

// GET all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error in fetching products:", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});

// CREATE a new product
app.post('/api/products', async (req, res) => {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
        return res.status(400).json({ success: false, message: "Please provide all fields correctly" });
    }

    try {
        const newProduct = new Product({ name, price, image });
        await newProduct.save();
        return res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in creating product:", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});

// UPDATE a product by ID
app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error in updating product:", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});

// DELETE a product by ID
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(204).send(); 
    } catch (error) {
        console.error("Error in deleting product:", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});

// Start the server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running at http://localhost:${PORT}`);
});