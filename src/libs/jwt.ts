import "dotenv/config";
import jwt from "jsonwebtoken";

type Payload = {
  id: string;
};

export function createAccessToken(payload: Payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_TOKEN as string,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
