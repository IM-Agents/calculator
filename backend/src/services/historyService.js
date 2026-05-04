const { randomUUID } = require('crypto');

const MAX_ITEMS_PER_SESSION = 10;
const MAX_SESSION_BUCKETS = 2000;

/** @type {Map<string, Array<{ id: string, expression: string, result: number, timestamp: string }>>} */
const sessions = new Map();

function touchSessionOrder(sessionId) {
  if (sessions.has(sessionId)) {
    const items = sessions.get(sessionId);
    sessions.delete(sessionId);
    sessions.set(sessionId, items);
  }
}

function enforceBucketCap() {
  while (sessions.size > MAX_SESSION_BUCKETS) {
    const firstKey = sessions.keys().next().value;
    sessions.delete(firstKey);
  }
}

function addEntry(sessionId, expression, result) {
  if (!sessionId) return null;
  enforceBucketCap();
  touchSessionOrder(sessionId);
  let list = sessions.get(sessionId);
  if (!list) {
    list = [];
    sessions.set(sessionId, list);
  }
  const entry = {
    id: randomUUID(),
    expression,
    result,
    timestamp: new Date().toISOString(),
  };
  list.unshift(entry);
  if (list.length > MAX_ITEMS_PER_SESSION) {
    list.length = MAX_ITEMS_PER_SESSION;
  }
  return entry;
}

function getEntries(sessionId) {
  if (!sessionId) return [];
  touchSessionOrder(sessionId);
  return sessions.get(sessionId) ? [...sessions.get(sessionId)] : [];
}

function clear(sessionId) {
  if (!sessionId) return false;
  sessions.set(sessionId, []);
  return true;
}

module.exports = {
  addEntry,
  getEntries,
  clear,
  MAX_ITEMS_PER_SESSION,
  MAX_SESSION_BUCKETS,
};
