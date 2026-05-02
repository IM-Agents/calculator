const MAX_ITEMS = 10;
const items = [];

export function addHistoryItem(entry) {
  const record = {
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

export function getHistory() {
  return items.map((i) => ({ ...i }));
}

export function clearHistory() {
  items.length = 0;
}
