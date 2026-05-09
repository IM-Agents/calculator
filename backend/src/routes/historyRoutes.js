import { Router } from "express";
import { deleteHistory, readHistory } from "../controllers/historyController.js";

const router = Router();

router.get("/history", readHistory);
router.delete("/history", deleteHistory);

export default router;
