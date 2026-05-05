const express = require('express')
const { readHistory, removeHistory } = require('../controllers/historyController')

const router = express.Router()

router.get('/history', readHistory)
router.delete('/history', removeHistory)

module.exports = router
