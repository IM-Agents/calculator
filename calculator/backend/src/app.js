import express from 'express';
import cors from 'cors';
import calculationRoutes from './routes/calculationRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import memoryRoutes from './routes/memoryRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors({ origin: true }));
app.use(express.json({ limit: '32kb' }));

app.use('/api/v1', calculationRoutes);
app.use('/api/v1', historyRoutes);
app.use('/api/v1', memoryRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Calculator API listening on http://localhost:${PORT}`);
});
