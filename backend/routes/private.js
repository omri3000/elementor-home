import express from "express";
import { getPrivateData } from "../controllers/private.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// http://localhost:4000/api/private
router.get("/", protect, getPrivateData);

export default router;
