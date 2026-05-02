export function sanitizeAppend(buffer, char) {
  if (char === '.' && /\.\d*$/.test(buffer.split(/[-+*/%^()]/).pop() || '')) {
    return buffer;
  }
  return buffer + char;
}
