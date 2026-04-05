import express from "express";
import { sendEmail } from "../controllers/email.controller.js";
import {authenticateToken} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/send", authenticateToken, sendEmail);

export default router;