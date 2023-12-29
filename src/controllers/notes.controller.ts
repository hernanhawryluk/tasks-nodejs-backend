import { Request, Response } from "express";
import Note from "../models/note.model";
import { ObjectId } from "mongoose";

type CustomRequest = Request & {
  user: {
    id: ObjectId;
  };
};

export const getNotes = async (req: CustomRequest, res: Response) => {
  try {
    const notes = await Note.findOne({ user: req.user.id }).populate("user");
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateNotes = async (req: CustomRequest, res: Response) => {
  try {
    const { notes } = req.body;
    const newNotes = {
      notes: !notes ? "" : notes,
      user: req.user.id,
    };

    console.log(newNotes);
    const alreadyHaveNotes = await Note.findOne({ user: req.user.id });
    console.log(alreadyHaveNotes);
    if (!alreadyHaveNotes) {
      const savedNotes = await Note.create(newNotes);
      res.json(savedNotes);
    } else {
      const savedNotes = await Note.findOneAndUpdate(
        { user: req.user.id },
        req.body,
        {
          new: true,
        }
      );
      res.json(savedNotes);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
