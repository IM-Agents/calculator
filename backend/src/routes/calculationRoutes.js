import { Router } from "express";
import { evaluateCalculation } from "../controllers/calculationController.js";

const router = Router();

router.post("/calculate", evaluateCalculation);

export default router;
