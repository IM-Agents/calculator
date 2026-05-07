import express from 'express';
import * as memoryController from '../controllers/memoryController.js';

const router = express.Router();

router.get('/memory', memoryController.getMemory);
router.post('/memory', memoryController.postMemory);

export default router;
