import express from "express";
import {
  getIndex,
  postCalculate,
} from "../controllers/calculatorController.js";

const router = express.Router();

router.get("/", getIndex);
router.post("/calculate", postCalculate);

export default router;
