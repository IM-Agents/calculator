const BASE = '/api/v1';

async function parseJson(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: 'Unexpected response.' } };
  }
}

export async function calculateExpression(expression, angleMode) {
  const res = await fetch(`${BASE}/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expression, angleMode }),
  });
  return parseJson(res);
}

export async function fetchHistory() {
  const res = await fetch(`${BASE}/history`);
  return parseJson(res);
}

export async function clearHistoryRemote() {
  const res = await fetch(`${BASE}/history`, { method: 'DELETE' });
  return parseJson(res);
}

export async function fetchMemory() {
  const res = await fetch(`${BASE}/memory`);
  return parseJson(res);
}

export async function applyMemory(action, value) {
  const res = await fetch(`${BASE}/memory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, value }),
  });
  return parseJson(res);
}
