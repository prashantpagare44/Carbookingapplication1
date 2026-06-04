import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/config.js';
import carRoutes from './router/carRoutes.js';
import bookingRoutes from './router/bookingRoutes.js';
// import authRoutes from './router/authRoutes.js';


dotenv.config();

connectDb();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use('/', carRoutes);
app.use('/', bookingRoutes);
// app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
