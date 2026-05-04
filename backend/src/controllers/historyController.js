const historyService = require('../services/historyService');

function getHistory(req, res) {
  const items = historyService.getEntries(req.calcSessionId);
  res.json({
    success: true,
    data: { items },
  });
}

function deleteHistory(req, res) {
  historyService.clear(req.calcSessionId);
  res.json({
    success: true,
    data: { cleared: true },
  });
}

module.exports = { getHistory, deleteHistory };
