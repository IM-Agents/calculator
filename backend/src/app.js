const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { v4: uuidv4 } = require('uuid')
const calculationRoutes = require('./routes/calculationRoutes')
const historyRoutes = require('./routes/historyRoutes')
const { errorHandler } = require('./middleware/errorHandler')

const app = express()

const allowlist = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:3000')
  .split(',')
  .map((item) => item.trim())

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowlist.includes(origin)) {
      callback(null, true)
      return
    }
    callback(new Error('Origin not allowed by CORS'))
  },
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  const existingSessionId = req.cookies.calc_sid
  const sessionId = existingSessionId || uuidv4()
  req.calcSessionId = sessionId

  if (!existingSessionId) {
    res.cookie('calc_sid', sessionId, {
      httpOnly: true,
      sameSite: 'lax'
    })
  }
  next()
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api', calculationRoutes)
app.use('/api', historyRoutes)
app.use(errorHandler)

module.exports = app
