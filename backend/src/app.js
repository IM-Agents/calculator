import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import calculationRoutes from "./routes/calculationRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import { ensureSession } from "./middleware/sessionMiddleware.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();

const defaultAllowed = ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"];
const configured = process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()).filter(Boolean);
const allowedOrigins = configured?.length ? configured : defaultAllowed;

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(ensureSession);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", calculationRoutes);
app.use("/api", historyRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
