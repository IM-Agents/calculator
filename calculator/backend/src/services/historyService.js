const MAX = 10;
const sessionEntries = new Map();

function normalizeSessionId(sessionId) {
  return sessionId || 'default';
}

function getEntries(sessionId) {
  const key = normalizeSessionId(sessionId);
  if (!sessionEntries.has(key)) sessionEntries.set(key, []);
  return sessionEntries.get(key);
}

export function listHistory(sessionId) {
  return [...getEntries(sessionId)];
}

export function addHistory(sessionId, expression, result) {
  const entries = getEntries(sessionId);
  entries.unshift({
    expression,
    result,
    createdAt: new Date().toISOString(),
  });
  while (entries.length > MAX) entries.pop();
}

export function clearHistory(sessionId) {
  const key = normalizeSessionId(sessionId);
  sessionEntries.delete(key);
}
