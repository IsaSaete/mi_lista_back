import { NextFunction, Request, Response } from "express";
import { IUserCreate } from "../userTypes.js";

export interface AuthControllerStructure {
  registerUser: (
    req: RegisterRequest,
    res: RegisterResponse,
    next: NextFunction,
  ) => Promise<void>;
}

export type RegisterRequestBody = IUserCreate;

export type RegisterRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  RegisterRequestBody,
  Record<string, unknown>
>;

export type AuthResponseBody = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export type RegisterResponse = Response<AuthResponseBody>;
