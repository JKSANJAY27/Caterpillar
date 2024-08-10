import express from "express";
import header from "../controller/headerController.js";
import {isAuthenticated} from "../middleware/auth.js";

const router = express.Router();

router.post("/", header);

export default router;