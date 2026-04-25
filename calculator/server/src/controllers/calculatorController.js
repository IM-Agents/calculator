import { calculate, getHistory, saveHistory } from "../services/calculatorService.js";
import {
  validateCalculationBody,
  validateHistoryBody
} from "../validators/calculateValidator.js";

export const calculateResult = (req, res) => {
  const validationError = validateCalculationBody(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const { left, operator, right } = req.body;
    const result = calculate(left, operator, right);
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createHistory = (req, res) => {
  const validationError = validateHistoryBody(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const item = saveHistory(req.body);
  return res.status(201).json(item);
};

export const listHistory = (_req, res) => {
  return res.status(200).json({ items: getHistory() });
};
