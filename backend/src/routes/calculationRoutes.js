const express = require('express')
const { calculateExpression } = require('../controllers/calculationController')

const router = express.Router()

router.post('/calculate', calculateExpression)

module.exports = router
