import express from 'express';
import cors from 'cors';
import calculationRoutes from './routes/calculationRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { sessionMiddleware } from './middleware/sessionMiddleware.js';

const app = express();

app.use(
  cors({
    origin: true,
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
