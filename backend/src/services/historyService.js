import { randomUUID } from "node:crypto";

const SESSION_HISTORY = new Map();
const MAX_ITEMS = 10;

export function getHistory(sessionId) {
  return SESSION_HISTORY.get(sessionId) ?? [];
}

export function clearHistory(sessionId) {
  SESSION_HISTORY.set(sessionId, []);
  return true;
}

export function addHistoryItem(sessionId, expression, result) {
  const current = getHistory(sessionId);
  const historyItem = {
    id: randomUUID(),
    expression,
    result,
    timestamp: new Date().toISOString()
  };

  const updated = [historyItem, ...current].slice(0, MAX_ITEMS);
  SESSION_HISTORY.set(sessionId, updated);
  return historyItem;
}
