export function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    const pathOnly = req.path || '/';
    console.log(`${req.method} ${pathOnly} ${res.statusCode} ${ms}ms`);
  });
  next();
}
