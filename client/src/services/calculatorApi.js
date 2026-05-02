const BASE = '/api/v1/calculator';

export async function evaluateExpression(expression, angleMode) {
  const res = await fetch(`${BASE}/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expression, angleMode }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.success) {
    const msg = json.error?.message || 'Calculation failed.';
    const code = json.error?.code || 'ERROR';
    const err = new Error(msg);
    err.code = code;
    throw err;
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
    const msg = json.error?.message || 'Calculation failed.';
    const err = new Error(msg);
    err.code = json.error?.code;
    throw err;
  }
  return json.data;
}

export async function postHistory(entry) {
  await fetch(`${BASE}/history`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
}
