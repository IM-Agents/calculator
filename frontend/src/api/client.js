const jsonHeaders = { 'Content-Type': 'application/json' }

async function parseJsonResponse(res) {
  const text = await res.text()
  let body
  try {
    body = text ? JSON.parse(text) : {}
  } catch {
    body = {}
  }
  return { body, ok: res.ok, status: res.status }
}

export async function postCalculate(expression, angleMode) {
  const res = await fetch('/api/calculate', {
    method: 'POST',
    headers: jsonHeaders,
    credentials: 'include',
    body: JSON.stringify({ expression, angleMode }),
  })
  return parseJsonResponse(res)
}

export async function getHistory() {
  const res = await fetch('/api/history', {
    method: 'GET',
    credentials: 'include',
  })
  return parseJsonResponse(res)
}

export async function deleteHistory() {
  const res = await fetch('/api/history', {
    method: 'DELETE',
    credentials: 'include',
  })
  return parseJsonResponse(res)
}
