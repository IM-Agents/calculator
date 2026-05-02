import express from 'express';
import cors from 'cors';
import calculatorRoutes from './routes/calculator.routes.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '32kb' }));
app.use(requestLogger);

app.use('/api/v1/calculator', calculatorRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: 'Route not found.' },
  });
});

app.use(errorHandler);

export default app;
