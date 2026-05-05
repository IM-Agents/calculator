const { clearHistory, getHistory } = require('../services/historyService')

function readHistory(req, res) {
  res.json({ history: getHistory(req.calcSessionId) })
}

function removeHistory(req, res) {
  clearHistory(req.calcSessionId)
  res.status(204).send()
}

module.exports = { readHistory, removeHistory }
