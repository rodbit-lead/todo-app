import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db';
import todoRoutes from './routes/todoRoutes';

const app = express();
dotenv.config();

// MIDDLEWARE
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`)
  next()
})

// ROUTES
app.use('/api', todoRoutes)

// CONNECT TO DB
connectDB();

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
