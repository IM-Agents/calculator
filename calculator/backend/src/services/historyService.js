const MAX = 10;
const entries = [];

export function listHistory() {
  return [...entries];
}

export function addHistory(expression, result) {
  entries.unshift({
    expression,
    result,
    createdAt: new Date().toISOString(),
  });
  while (entries.length > MAX) entries.pop();
}

export function clearHistory() {
  entries.length = 0;
}
