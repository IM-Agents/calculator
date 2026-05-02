import { randomUUID } from 'node:crypto';

const MAX_ITEMS = 10;
const MAX_SESSION_BUCKETS = 2000;

const sessions = new Map();

function getBucket(sessionId) {
  if (sessions.has(sessionId)) {
    return sessions.get(sessionId);
  }
  while (sessions.size >= MAX_SESSION_BUCKETS) {
    const first = sessions.keys().next().value;
    if (first === undefined) break;
    sessions.delete(first);
  }
  const arr = [];
  sessions.set(sessionId, arr);
  return arr;
}

export function addHistoryItem(sessionId, entry) {
  const items = getBucket(sessionId);
  const record = {
    id: randomUUID(),
    expression: entry.expression,
    result: entry.result,
    timestamp: new Date().toISOString(),
  };
  items.unshift(record);
  while (items.length > MAX_ITEMS) {
    items.pop();
  }
  return record;
}

export function getHistory(sessionId) {
  const items = sessions.get(sessionId);
  if (!items) return [];
  return items.map((i) => ({ ...i }));
}

export function clearHistory(sessionId) {
  if (sessions.has(sessionId)) {
    sessions.get(sessionId).length = 0;
  }
}
