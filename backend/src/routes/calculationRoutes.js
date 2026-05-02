import { Router } from 'express';
import { postCalculate } from '../controllers/calculationController.js';

const router = Router();
router.post('/calculate', postCalculate);

export default router;
