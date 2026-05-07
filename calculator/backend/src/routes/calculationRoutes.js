import express from 'express';
import * as calculationController from '../controllers/calculationController.js';

const router = express.Router();

router.post('/calculate', calculationController.postCalculate);
router.get('/health', calculationController.getHealth);

export default router;
