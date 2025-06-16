import express from "express";
import { getUserConversations, createConversation } from "../controllers/conversation.controllers.js";
import protectRoute from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all conversations for current user with populated last message and participants
router.get("/", protectRoute, getUserConversations);

// Create new conversation (1-1 or group)
router.post("/", protectRoute, createConversation);

export default router;
