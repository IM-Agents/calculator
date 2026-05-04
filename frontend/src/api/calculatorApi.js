/**
 * @param {string} expression
 * @param {'deg' | 'rad'} angleMode
 */
export async function evaluateOnServer(expression, angleMode) {
  const res = await fetch('/api/calculator/evaluate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expression, angleMode }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.success) {
    const msg = body.error?.message ?? 'The expression could not be evaluated.';
    throw new Error(msg);
  }
  return body.data;
}

export async function fetchHistory() {
  const res = await fetch('/api/calculator/history');
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.success) {
    const msg = body.error?.message ?? 'Could not load history.';
    throw new Error(msg);
  }
  return body.data ?? [];
}

export async function clearServerHistory() {
  const res = await fetch('/api/calculator/history', { method: 'DELETE' });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.success) {
    throw new Error(body.error?.message ?? 'Could not clear history.');
  }
}
