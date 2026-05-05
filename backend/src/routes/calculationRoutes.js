import { Router } from "express";
import { calculateExpression } from "../controllers/calculationController.js";

const router = Router();

router.post("/calculate", calculateExpression);

export default router;
