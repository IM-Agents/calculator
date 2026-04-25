import cors from "cors";
import express from "express";
import calculatorRoutes from "./routes/calculatorRoutes.js";

const app = express();

const normalizeOrigin = (origin) => origin.trim().replace(/\/+$/, "");

const parseAllowedOrigins = () => {
  const raw = process.env.CORS_ALLOWED_ORIGINS || process.env.ALLOWED_ORIGINS || "";
  return raw
    .split(",")
    .map(normalizeOrigin)
    .filter(Boolean);
};

const allowedOrigins = parseAllowedOrigins();
const isProduction = process.env.NODE_ENV === "production";

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = normalizeOrigin(origin);
      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      if (!isProduction && allowedOrigins.length === 0) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    }
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", calculatorRoutes);

export default app;
