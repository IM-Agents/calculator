import express from 'express';
import * as historyController from '../controllers/historyController.js';

const router = express.Router();

router.get('/history', historyController.getHistory);
router.post('/history', historyController.postHistory);
router.delete('/history', historyController.deleteHistory);

export default router;
