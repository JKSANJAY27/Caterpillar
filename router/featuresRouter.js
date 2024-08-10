import express from "express";
import tire from "../controller/tireController.js";
import battery from "../controller/batteryController.js";
import exterior from "../controller/exteriorController.js";
import brakes from "../controller/brakesController.js";
import engine from "../controller/engineController.js";
import feedback from "../controller/feedbackController.js";

const router = express.Router();

router.post("/tire", tire);
router.post("/battery", battery);
router.post("/exterior", exterior);
router.post("/brakes", brakes);
router.post("/engine", engine);
router.post("/feedback", feedback);

export default router;