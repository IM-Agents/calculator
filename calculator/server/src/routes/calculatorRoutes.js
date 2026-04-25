import { Router } from "express";
import {
  calculateResult,
  createHistory,
  listHistory
} from "../controllers/calculatorController.js";

const router = Router();

router.post("/calculate", calculateResult);
router.post("/history", createHistory);
router.get("/history", listHistory);

export default router;
