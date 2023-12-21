import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  date: z.string().datetime().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.string().datetime().optional(),
  completed: z.boolean().optional(),
  important: z.boolean().optional(),
});
