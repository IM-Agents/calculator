import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import calculationRoutes from "./routes/calculationRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:5173,http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origin not allowed by CORS."));
    },
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", calculationRoutes);
app.use("/api", historyRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
