import { Request, Response } from 'express';
import { executeTree } from '../services/executeTreeService';

export async function handleExecuteTree(req: Request, res: Response) {
  const { tree, context } = req.body;

  if (!tree) {
    return res.status(400).json({ error: 'Missing decision tree in request body.' });
  }

  try {
    const result = await executeTree(tree, context || {});
    return res.status(200).json({ status: 'success', duration: result.duration });
  } catch (err: any) {
    console.error('[Execution Error]', err.message);
    return res.status(500).json({ status: 'error', message: err.message });
  }
}
