import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.post('/execute-tree', (req: Request, res: Response) => {
  res.json({ message: 'Execution logic not yet implemented' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SmartFlow Core running on port ${PORT}`));
