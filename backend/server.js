import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js"
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

// Start the server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running at http://localhost:${PORT}`);
});