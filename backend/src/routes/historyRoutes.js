import { Router } from "express";
import { deleteHistoryItems, getHistoryItems } from "../controllers/historyController.js";

const router = Router();

router.get("/history", getHistoryItems);
router.delete("/history", deleteHistoryItems);

export default router;
