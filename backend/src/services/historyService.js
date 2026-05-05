import { randomUUID } from "node:crypto";

const MAX_HISTORY = 10;
const sessionHistory = new Map();

function getBucket(sessionId) {
  if (!sessionHistory.has(sessionId)) {
    sessionHistory.set(sessionId, []);
  }
  return sessionHistory.get(sessionId);
}

export function addHistoryItem(sessionId, expression, result) {
  const bucket = getBucket(sessionId);
  bucket.unshift({
    id: randomUUID(),
    expression,
    result,
    createdAt: new Date().toISOString()
  });
  if (bucket.length > MAX_HISTORY) {
    bucket.length = MAX_HISTORY;
  }
}

export function getHistory(sessionId) {
  return [...getBucket(sessionId)];
}

export function clearHistory(sessionId) {
  sessionHistory.set(sessionId, []);
}
