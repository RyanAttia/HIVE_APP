import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { get_users_for_sidebar  } from "../controllers/user_controller.js";

const router = express.Router();

router.get("/", protectRoute, get_users_for_sidebar );

export default router;
