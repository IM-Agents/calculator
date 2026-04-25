import cors from "cors";
import express from "express";
import calculatorRoutes from "./routes/calculatorRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", calculatorRoutes);

export default app;
