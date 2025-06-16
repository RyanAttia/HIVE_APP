import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controllers.js";
import protectRoute from "../middleware/authMiddleware.js";

const router = express.Router();

// Get messages for a conversation
router.get("/:conversationId", protectRoute, getMessages);

// Send message
router.post("/", protectRoute, sendMessage);

export default router;
