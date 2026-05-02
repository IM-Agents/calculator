import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import calculationRoutes from './routes/calculationRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { sessionMiddleware } from './middleware/sessionMiddleware.js';

const allowedCorsOrigins = new Set(env.corsOrigins);

function corsOrigin(origin, callback) {
  if (!origin) {
    callback(null, true);
    return;
  }
  if (allowedCorsOrigins.has(origin)) {
    callback(null, true);
    return;
  }
  callback(null, false);
}

const app = express();

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }),
);
app.use(express.json({ limit: '32kb' }));

app.use('/api', sessionMiddleware);
app.use('/api', calculationRoutes);
app.use('/api', historyRoutes);

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use(errorHandler);

export default app;
