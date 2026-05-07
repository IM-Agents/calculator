const MAX_ITEMS = 10;

let items = [];

export function addHistoryItem(entry) {
  items = [{ ...entry, timestamp: new Date().toISOString() }, ...items].slice(
    0,
    MAX_ITEMS
  );
  return items[0];
}

export function listHistory() {
  return [...items];
}

export function clearHistory() {
  items = [];
}
