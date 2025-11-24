import { NextFunction, Request, Response } from "express";

export interface AuthControllerStructure {
  registerUser: (
    req: RegisterRequest,
    res: AuthResponse,
    next: NextFunction,
  ) => Promise<void>;
}

export interface RegisterRequestBody {
  email: string;
  password: string;
  name: string;
}

export type RegisterRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  RegisterRequestBody,
  Record<string, unknown>
>;

export interface AuthResponseBody {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
export type AuthResponse = Response<AuthResponseBody>;
