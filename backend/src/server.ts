import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../utils/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
connectDB();

app.get('/', (req, res) => {
  res.send('Hello from Todo App Backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
