import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "../verifyToken.js";
import ServerError from "../../../server/serverError/serverError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the verifyToken middleare", () => {
  const res = {} as Response;
  const next = jest.fn();

  describe("When it receives a request with valid token", () => {
    const req: Pick<Request, "header"> = {
      header: jest.fn().mockReturnValue("Bearer valid-token"),
    };

    test("Then it should call the next function", async () => {
      jwt.verify = jest.fn().mockReturnValue({ userId: "123" });

      await verifyToken(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When it receives a request without Authorization header", () => {
    const req: Pick<Request, "header"> = {
      header: jest.fn().mockReturnValue(null),
    };

    test("Then it should call the next function with a 401 error and 'Acceso denegado, token requerido'", async () => {
      const error = new ServerError(401, "Acceso denegado, token requerido");

      await verifyToken(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a request with invalid format token", () => {
    const req: Pick<Request, "header"> = {
      header: jest.fn().mockReturnValue("Bearer "),
    };

    test("Then it should call the next function with a 401 errro and 'Token inválido' message", async () => {
      const error = new ServerError(401, "Token inválido");

      await verifyToken(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
