import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export type Token = {
  id: string;
  iat: number;
  exp: number;
};

interface CustomRequest extends Request {
  cookies: JwtPayload | undefined;
  user: Token;
}

const authenticate = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(
    token,
    process.env.JWT_TOKEN as string,
    (err: Error, user: Token) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      req.user = user;

      next();
    }
  );
};

export default authenticate;
