import app from './app.js';

/**
 * Listen port: CALCULATOR_API_PORT overrides PORT (use when PORT is claimed by another local app).
 * On PaaS, set CALCULATOR_API_PORT to the platform PORT if needed, or rely on PORT alone.
 */
const PORT =
  Number(process.env.CALCULATOR_API_PORT || process.env.PORT) || 3001;

app.listen(PORT, () => {
  console.log(`Calculator API listening on http://localhost:${PORT}`);
});
