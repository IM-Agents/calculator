export function mapHistoryEntries(payload) {
  if (!payload?.success || !Array.isArray(payload.data)) return [];
  return payload.data.map((item, index) => ({
    id: `${item.createdAt}-${index}`,
    expression: item.expression,
    result: item.result,
    createdAt: item.createdAt,
  }));
}
