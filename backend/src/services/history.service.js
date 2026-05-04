const MAX = 10;
const entries = [];

export function addHistoryItem(expression, result) {
  const item = {
    expression,
    result: String(result),
    createdAt: new Date().toISOString(),
  };
  entries.unshift(item);
  while (entries.length > MAX) entries.pop();
  return item;
}

export function getHistory() {
  return [...entries];
}

export function clearHistory() {
  entries.length = 0;
}
