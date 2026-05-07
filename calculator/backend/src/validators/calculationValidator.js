const ALLOWED_ANGLE = new Set(['deg', 'rad']);

export function validateCalculateBody(body) {
  const errors = [];
  if (!body || typeof body !== 'object') {
    return { ok: false, errors: ['Body must be a JSON object.'] };
  }
  if (typeof body.expression !== 'string') {
    errors.push('expression must be a string.');
  }
  const mode = body.angleMode ?? 'deg';
  if (!ALLOWED_ANGLE.has(mode)) {
    errors.push('angleMode must be "deg" or "rad".');
  }
  return errors.length ? { ok: false, errors } : { ok: true, angleMode: mode };
}
