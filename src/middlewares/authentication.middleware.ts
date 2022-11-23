import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/app.error";

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    throw new AppError("Invalid token", 401);
  }

  const token = !!bearerToken.includes("Bearer") ? bearerToken.split(" ")[1] : bearerToken;

  jwt.verify(token, process.env.SECRET_KEY as string, (error: any, decode: any) => {
    if (error) {
      throw new AppError("Invalid token", 401);
    }

    req.user = {
      type: decode.type,
      id: decode.sub,
    };

    next();
  });
};

export default authenticationMiddleware;
