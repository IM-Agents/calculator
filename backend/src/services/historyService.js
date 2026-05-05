const MAX_HISTORY = 10
const historyBuckets = new Map()

function getHistory(sessionId) {
  return historyBuckets.get(sessionId) || []
}

function addHistoryEntry(sessionId, entry) {
  const current = getHistory(sessionId)
  const next = [entry, ...current].slice(0, MAX_HISTORY)
  historyBuckets.set(sessionId, next)
  return next
}

function clearHistory(sessionId) {
  historyBuckets.delete(sessionId)
}

module.exports = { getHistory, addHistoryEntry, clearHistory }
