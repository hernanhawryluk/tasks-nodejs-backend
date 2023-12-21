import { Router } from "express";
import authenticate from "../middlewares/auth.middleware";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema";

const router = Router();

router.get("/tasks", authenticate, getTasks);
router.get("/tasks/:id", authenticate, getTask);
router.post(
  "/tasks",
  authenticate,
  validateSchema(createTaskSchema),
  createTask
);
router.delete("/tasks/:id", authenticate, deleteTask);
router.put(
  "/tasks/:id",
  authenticate,
  validateSchema(updateTaskSchema),
  updateTask
);

export default router;
