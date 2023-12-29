import { z } from "zod";

export const updateNoteSchema = z.object({
  notes: z
    .string()
    .max(900, { message: "Notes must be less than 900 characters" })
    .optional(),
});
