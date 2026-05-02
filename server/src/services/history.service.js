const entries = [];
const MAX = 100;

export function addHistoryEntry(item) {
  const row = {
    expression: String(item.expression),
    result: item.result,
    angleMode: item.angleMode,
    timestamp: new Date().toISOString(),
  };
  entries.unshift(row);
  if (entries.length > MAX) entries.length = MAX;
  return row;
}

export function listHistory(limit = 50) {
  return entries.slice(0, Math.min(limit, entries.length));
}
