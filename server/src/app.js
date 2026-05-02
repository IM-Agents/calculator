import express from 'express';
import cors from 'cors';
import calculatorRoutes from './routes/calculator.routes.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

const corsOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const corsOrigin =
  corsOrigins.length === 0
    ? 'http://localhost:5173'
    : corsOrigins.length === 1
      ? corsOrigins[0]
      : corsOrigins;

app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: '32kb' }));
app.use(requestLogger);

app.use('/api/v1/calculator', calculatorRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: 'The requested resource could not be found.' },
  });
});

app.use(errorHandler);

export default app;
