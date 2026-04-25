const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const saveHistoryRecord = async (record) => {
  try {
    const response = await fetch(`${API_BASE}/history`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record)
    });

    if (!response.ok) {
      return;
    }
  } catch {
    // Keep UI usable when backend is not running.
  }
};
