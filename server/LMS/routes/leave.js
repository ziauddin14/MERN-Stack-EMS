import express from "express";
import { addLeave, getLeaves } from "../controllers/leaveController.js";

const router = express.Router();

router.post("/add", addLeave);
router.get("/:id", getLeaves);

export default router;
