import { Router } from 'express';
import * as calculatorController from '../controllers/calculator.controller.js';

const router = Router();

router.get('/health', calculatorController.health);
router.post('/evaluate', calculatorController.evaluate);
router.get('/history', calculatorController.getHistory);
router.post('/history', calculatorController.postHistory);

export default router;
