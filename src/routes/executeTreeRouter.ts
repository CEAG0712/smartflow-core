import { Router } from 'express';
import { handleExecuteTree } from '../controllers/executeTreeController';

const router = Router();
router.post('/', handleExecuteTree);

export default router;