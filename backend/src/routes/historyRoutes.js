import { Router } from "express";
import { deleteHistory, getHistory } from "../controllers/historyController.js";

const router = Router();

router.get("/history", getHistory);
router.delete("/history", deleteHistory);

export default router;
