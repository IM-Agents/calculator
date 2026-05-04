import express from 'express';
import cors from 'cors';
import calculatorRoutes from './routes/calculator.routes.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors({ origin: true }));
app.use(express.json({ limit: '32kb' }));

app.use('/api/calculator', calculatorRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: 'Route not found.' },
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Calculator API listening on http://localhost:${PORT}`);
});
