import express from "express";
import { loginUser, signupUser } from "../controllers/userController.js";

const router = express.Router();

// Public Routes
router.post("/login", loginUser);
router.post("/signup", signupUser);

export default router;
