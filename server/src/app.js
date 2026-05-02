import express from 'express';
import cors from 'cors';
import calculatorRoutes from './routes/calculator.routes.js';
import { getCorsOriginOption } from './config/env.js';
import { ERROR_CODES } from './utils/constants.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors({ origin: getCorsOriginOption() }));
app.use(express.json({ limit: '32kb' }));
app.use(requestLogger);

app.use('/api/v1/calculator', calculatorRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: ERROR_CODES.NOT_FOUND,
      message: 'The requested resource could not be found.',
    },
  });
});

app.use(errorHandler);

export default app;
