import express from "express";
import { getPosts, createPost } from "../controllers/posts.js";

const router = express.Router();

// http://localhost:4000/api/posts
router.get("/:id", getPosts);
router.post("/", createPost);

export default router;
