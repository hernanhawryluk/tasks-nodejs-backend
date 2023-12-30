import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt";
import { Token } from "middlewares/auth.middleware";
import jwt from "jsonwebtoken";

interface ProfileRequest extends Request {
  user: Token;
}

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json({ message: ["The email is already in use"] });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id.toString() });

    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = await createAccessToken({ id: userFound._id.toString() });

    res.cookie("token", token, { httpOnly: false });
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", { expires: new Date(0) });
    return res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const profile = async (req: ProfileRequest, res: Response) => {
  try {
    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json({ message: "User not found" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(
      token,
      process.env.JWT_TOKEN as string,
      async (err: Error, user: Token) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });

        const userFound = await User.findById(user.id);
        if (!userFound)
          return res.status(401).json({ message: "Unauthorized" });

        return res.json({
          id: userFound._id,
          username: userFound.username,
          email: userFound.email,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
