import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import executeTreeRouter from './routes/executeTreeRouter';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/execute-tree', executeTreeRouter);


const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SmartFlow Core running on port ${PORT}`);
});

