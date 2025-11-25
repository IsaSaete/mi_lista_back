import { NextFunction, Response } from "express";
import { LoginRequest, LoginResponse } from "../types.js";
import { isaUserRegistered } from "../../fixtures/fixturesAuth.js";
import { Model } from "mongoose";
import { IUserStructure } from "../../userTypes.js";
import AuthController from "../AuthController.js";
import ServerError from "../../../server/serverError/serverError.js";

beforeEach(() => {
  jest.clearAllMocks();
  process.env.JWT_SECRET = "test_secret_key_for_jwt";
});

describe("Given the loginUser method", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives an email & password to access Isa's data", () => {
    const req: Pick<LoginRequest, "body"> = {
      body: {
        email: isaUserRegistered.email,
        password: isaUserRegistered.password,
      },
    };

    const authUserModel: Pick<Model<IUserStructure>, "findOne"> = {
      findOne: jest.fn().mockResolvedValue({
        ...isaUserRegistered,
        comparePassword: jest.fn().mockResolvedValue(true),
      }),
    };

    test("Then it should call the response's method with 200 status code", async () => {
      const autController = new AuthController(
        authUserModel as Model<IUserStructure>,
      );

      await autController.loginUser(
        req as LoginRequest,
        res as LoginResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("Then it should call the response's method json with 'Isa' data user", async () => {
      const autController = new AuthController(
        authUserModel as Model<IUserStructure>,
      );

      await autController.loginUser(
        req as LoginRequest,
        res as LoginResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          user: {
            id: "123456789012345678901234",
            email: "isasaete@gmail.com",
            name: "Isabel",
          },
        }),
      );
    });
  });

  describe("When it receives an email & password to access Isa's data but the password isn't valid", () => {
    const req: Pick<LoginRequest, "body"> = {
      body: {
        email: isaUserRegistered.email,
        password: "invalid",
      },
    };

    const authUserModel: Pick<Model<IUserStructure>, "findOne"> = {
      findOne: jest.fn().mockResolvedValue({
        ...isaUserRegistered,
        comparePassword: jest.fn().mockResolvedValue(false),
      }),
    };

    test("Then it should  call the next funcion with a 401 and 'Credenciales inválidas'", async () => {
      const expectedError = new ServerError(401, "Credenciales inválidas");

      const autController = new AuthController(
        authUserModel as Model<IUserStructure>,
      );

      await autController.loginUser(
        req as LoginRequest,
        res as LoginResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives an email & password to access Diego's data but aren't registered", () => {
    const req: Pick<LoginRequest, "body"> = {
      body: {
        email: isaUserRegistered.email,
        password: isaUserRegistered.password,
      },
    };

    const authUserModel: Pick<Model<IUserStructure>, "findOne"> = {
      findOne: jest.fn().mockResolvedValue(null),
    };

    test("Then it should call the next funcion with a 401 and 'Credenciales inválidas'", async () => {
      const expectedError = new ServerError(401, "Credenciales inválidas");

      const autController = new AuthController(
        authUserModel as Model<IUserStructure>,
      );

      await autController.loginUser(
        req as LoginRequest,
        res as LoginResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
