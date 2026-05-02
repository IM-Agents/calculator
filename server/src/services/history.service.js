import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_FILE = path.join(__dirname, '..', 'data', 'calculator-history.json');

const dataFile = process.env.HISTORY_PERSISTENCE_FILE || DEFAULT_FILE;
const MAX = 100;

let entries = [];

function ensureDirFor(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadFromDisk() {
  try {
    if (!fs.existsSync(dataFile)) {
      entries = [];
      return;
    }
    const raw = fs.readFileSync(dataFile, 'utf8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      entries = [];
      return;
    }
    entries = parsed.slice(0, MAX).map((row) => ({
      expression: String(row.expression ?? ''),
      result: row.result,
      angleMode: row.angleMode,
      timestamp: typeof row.timestamp === 'string' ? row.timestamp : new Date().toISOString(),
    }));
  } catch (err) {
    console.error('[history] load failed:', dataFile, err?.message || err);
    entries = [];
  }
}

function persistToDisk() {
  try {
    ensureDirFor(dataFile);
    fs.writeFileSync(dataFile, `${JSON.stringify(entries)}\n`, 'utf8');
  } catch (err) {
    console.error('[history] persist failed:', err.message);
  }
}

loadFromDisk();

export function addHistoryEntry(item) {
  const row = {
    expression: String(item.expression),
    result: item.result,
    angleMode: item.angleMode,
    timestamp: new Date().toISOString(),
  };
  entries.unshift(row);
  if (entries.length > MAX) entries.length = MAX;
  persistToDisk();
  return row;
}

export function listHistory(limit = 50) {
  return entries.slice(0, Math.min(limit, entries.length));
}
