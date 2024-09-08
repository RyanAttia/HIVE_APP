import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import connect_mongo_db from "./db/connect_mongo_db.js";
import authRoutes from "./routes/auth_routes.js";
import messageRoutes from "./routes/message_routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads from req.body
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
    connect_mongo_db();
    console.log (`Server Running on port ${PORT}`);
});