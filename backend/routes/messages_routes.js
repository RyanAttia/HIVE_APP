import express from "express";
import { get_messages, send_message } from '../controllers/messages_controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/:id", protectRoute, get_messages);
router.post("/send/:id", protectRoute, send_message);

export default router;