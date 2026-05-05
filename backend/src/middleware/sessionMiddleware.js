import { randomUUID } from "node:crypto";

export function ensureSession(req, res, next) {
  const existing = req.cookies?.calc_sid;
  if (existing) {
    req.sessionId = existing;
    return next();
  }

  const sessionId = randomUUID();
  res.cookie("calc_sid", sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 1000 * 60 * 60 * 12
  });
  req.sessionId = sessionId;
  next();
}
