import app from './app.js';
import { env } from './config/env.js';

/**
 * Listen port: `env.listenPort` from CALCULATOR_API_PORT, then PORT, then 3001.
 * On PaaS, set CALCULATOR_API_PORT to the platform PORT if needed, or rely on PORT alone.
 */
app.listen(env.listenPort, () => {
  console.log(`Calculator API listening on port ${env.listenPort}`);
});
