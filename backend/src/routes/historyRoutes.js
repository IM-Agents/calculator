import { Router } from 'express';
import { deleteHistory, getHistoryList } from '../controllers/historyController.js';

const router = Router();
router.get('/history', getHistoryList);
router.delete('/history', deleteHistory);

export default router;
