import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ServerError from "../../server/serverError/serverError.js";
import { TokenPayload } from "./types.js";

export const verifyToken = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    const error = new ServerError(401, "Acceso denegado, token requerido");

    next(error);

    return;
  }

  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    const error = new ServerError(401, "Token inválido");

    next(error);

    return;
  }

  try {
    const verifiedToken = jwt.verify(
      token,
      process.env.JWT_SECRET,
    ) as TokenPayload;

    req.user = verifiedToken;

    next();
  } catch {
    const error = new ServerError(401, "Token inválido");

    next(error);
  }
};
