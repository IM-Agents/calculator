import { calculate } from "../services/calculationService.js";

export function evaluateCalculation(req, res, next) {
  try {
    const { expression, angleMode } = req.body ?? {};
    if (expression === undefined || expression === null) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_EXPRESSION",
          message: "Expression is required.",
        },
      });
    }
    if (typeof expression !== "string") {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_EXPRESSION",
          message: "Expression must be a string.",
        },
      });
    }
    if (angleMode !== undefined && angleMode !== "DEG" && angleMode !== "RAD") {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_EXPRESSION",
          message: "angleMode must be DEG or RAD.",
        },
      });
    }

    const data = calculate(expression, angleMode ?? "DEG");
    return res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}
