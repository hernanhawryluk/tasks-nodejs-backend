import { Request, Response } from "express";
import Task from "../models/task.model";
import { ObjectId } from "mongoose";

type CustomRequest = Request & {
  user: {
    id: ObjectId;
  };
};

export const getTasks = async (req: CustomRequest, res: Response) => {
  const tasks = await Task.find({
    user: req.user.id,
  }).populate("user");
  res.json(tasks);
};

export const createTask = async (req: CustomRequest, res: Response) => {
  const { title, description, date, completed, important } = req.body;

  const newTask = new Task({
    title,
    description,
    date,
    user: req.user.id,
    completed,
    important,
  });

  const savedTask = await newTask.save();
  res.json(savedTask);
};

export const getTask = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id).populate("user");
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(404).json({ message: "Task not found" });
  return res.sendStatus(204);
};
