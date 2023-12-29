import { Router } from "express";
import { updateNoteSchema } from "../schemas/note.schema";
import { getNotes, updateNotes } from "../controllers/notes.controller";
import authenticate from "../middlewares/auth.middleware";
import { validateSchema } from "../middlewares/validator.middleware";

const router = Router();

router.get("/notes", authenticate, getNotes);

router.put(
  "/notes",
  authenticate,
  validateSchema(updateNoteSchema),
  updateNotes
);

export default router;
