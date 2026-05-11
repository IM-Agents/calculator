const DEFAULT_ERROR_MESSAGE = "Network request failed.";

class ApiError extends Error {
  constructor(message, { code, status } = {}) {
    super(message);
    this.name = "ApiError";
    this.code = code ?? "API_ERROR";
    this.status = status ?? 0;
  }
}

async function parseJsonSafely(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(path, {
      credentials: "include",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {})
      }
    });
  } catch (networkError) {
    throw new ApiError(networkError.message || DEFAULT_ERROR_MESSAGE, {
      code: "NETWORK_ERROR"
    });
  }

  const payload = await parseJsonSafely(response);

  if (!response.ok || !payload || payload.success !== true) {
    const message = payload?.error?.message || DEFAULT_ERROR_MESSAGE;
    const code = payload?.error?.code || "API_ERROR";
    throw new ApiError(message, { code, status: response.status });
  }

  return payload.data;
}

export function postCalculate(expression, angleMode) {
  return request("/api/calculate", {
    method: "POST",
    body: JSON.stringify({ expression, angleMode })
  });
}

export function fetchHistory() {
  return request("/api/history", { method: "GET" });
}

export { ApiError };
