import { randomUUID } from "node:crypto";
import { calculate } from "../services/calculationService.js";

const COOKIE_NAME = "calc_sid";

function ensureSessionId(req, res) {
  const existing = req.cookies?.[COOKIE_NAME];
  if (existing) {
    return existing;
  }
  const sessionId = randomUUID();
  res.cookie(COOKIE_NAME, sessionId, { httpOnly: true, sameSite: "lax" });
  return sessionId;
}

export function calculateExpression(req, res, next) {
  try {
    const sessionId = ensureSessionId(req, res);
    const payload = calculate(req.body ?? {}, sessionId);
    res.status(200).json({ success: true, data: payload });
  } catch (error) {
    next(error);
  }
}

export { COOKIE_NAME, ensureSessionId };
