import { Router } from 'express';
import {
  postEvaluate,
  getHistoryHandler,
  deleteHistoryHandler,
} from '../controllers/calculator.controller.js';

const router = Router();

router.post('/evaluate', postEvaluate);
router.get('/history', getHistoryHandler);
router.delete('/history', deleteHistoryHandler);

export default router;
