import express from "express";
import {
  getIndex,
  postCalculate,
} from "../controllers/calculatorController.js";

const router = express.Router();

router.get("/", getIndex);
router.post("/", postCalculate);

export default router;
