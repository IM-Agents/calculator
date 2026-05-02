const BASE = '/api/v1/calculator';

function throwApiFailure(json, fallbackMessage) {
  const msg = json.error?.message || fallbackMessage;
  const raw = json.error?.code;
  const code = raw != null && raw !== '' ? String(raw) : 'ERROR';
  const err = new Error(msg);
  err.code = code;
  throw err;
}

export async function evaluateExpression(expression, angleMode) {
  const res = await fetch(`${BASE}/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expression, angleMode }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.success) {
    throwApiFailure(json, 'Calculation failed.');
  }
  return json.data;
}

export async function evaluateStructured(operation, operands, angleMode) {
  const res = await fetch(`${BASE}/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ operation, operands, angleMode }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.success) {
    throwApiFailure(json, 'Calculation failed.');
  }
  return json.data;
}

export async function postHistory(entry) {
  const res = await fetch(`${BASE}/history`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    throwApiFailure(json, 'Could not save history entry.');
  }
}
