import { Router } from "express";
import authenticate from "../middlewares/auth.middlewares";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller";

const router = Router();

router.get("/tasks", authenticate, getTasks);
router.get("/tasks/:id", authenticate, getTask);
router.post("/tasks", authenticate, createTask);
router.delete("/tasks/:id", authenticate, deleteTask);
router.put("/tasks/:id", authenticate, updateTask);

export default router;
