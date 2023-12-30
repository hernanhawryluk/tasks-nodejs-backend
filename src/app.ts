import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import tasksRoutes from "./routes/tasks.routes";
import notesRoutes from "./routes/notes.routes";

// ========================= only for Vercel
import { connectDB } from "./db";
connectDB();
// ========================= only for Vercel

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", tasksRoutes);
app.use("/api", notesRoutes);

export default app;
