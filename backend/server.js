import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();

app.get('/products', (req, res) => {
});


app.listen(PORT, () => {
    connectDB();
    console.log("Server is running at http://localhost:5000 ");
});