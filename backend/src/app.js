import cors from "cors";
import express from "express";
import calculationRoutes from "./routes/calculationRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "32kb" }));

app.use("/api", calculationRoutes);
app.use("/api", historyRoutes);

app.use(errorHandler);

export default app;
