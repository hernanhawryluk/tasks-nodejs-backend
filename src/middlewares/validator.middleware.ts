import { NextFunction, Request, Response } from "express";

export const validateSchema =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return res
        .status(400)
        .json({ error: error.errors.map((error: Error) => error.message) });
    }
  };
