const express = require('express');
const { postCalculate } = require('../controllers/calculateController');
const { getHistory, deleteHistory } = require('../controllers/historyController');

const router = express.Router();

router.post('/calculate', postCalculate);
router.get('/history', getHistory);
router.delete('/history', deleteHistory);

module.exports = router;
