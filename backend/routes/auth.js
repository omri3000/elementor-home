import express from "express";
import { register, login } from "../controllers/auth.js";

const router = express.Router();

// http://localhost:4000/api/auth
router.post("/register", register);
router.post("/login", login);

export default router;
