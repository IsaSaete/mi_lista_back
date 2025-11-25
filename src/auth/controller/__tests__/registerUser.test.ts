import { Model } from "mongoose";
import { NextFunction, Response } from "express";
import {
  diegoUserData,
  isaNewUser,
  isaUserRegistered,
} from "../../fixtures/fixturesAuth.js";
import { RegisterResponse, RegisterRequest } from "../types.js";
import { IUserStructure } from "../../userTypes.js";
import AuthController from "../AuthController.js";
import ServerError from "../../../server/serverError/serverError.js";

beforeEach(() => {
  jest.clearAllMocks();
  process.env.JWT_SECRET = "test_secret_key_for_jwt";
});

describe("Given the registerUser method", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a 'Isa' new user data", () => {
    const req: Pick<RegisterRequest, "body"> = {
      body: isaNewUser,
    };

    const authUserModel: Pick<Model<IUserStructure>, "findOne" | "create"> = {
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue(isaUserRegistered),
    };

    test("Then it should call the response's method with 201 status code", async () => {
      const authController = new AuthController(
        authUserModel as Model<IUserStructure>,
      );

      await authController.registerUser(
        req as RegisterRequest,
        res as RegisterResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(201);
    });

    test("Then it should call the response's method json with 'Isa' data user", async () => {
      const authController = new AuthController(
        authUserModel as Model<IUserStructure>,
      );

      await authController.registerUser(
        req as RegisterRequest,
        res as RegisterResponse,
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

  describe("When it receives a 'Diego' data that it's already registered", () => {
    const req: Pick<RegisterRequest, "body"> = {
      body: diegoUserData,
    };

    const authUserModel: Pick<Model<IUserStructure>, "findOne" | "create"> = {
      findOne: jest.fn().mockResolvedValue(diegoUserData),
      create: jest.fn().mockResolvedValue(null),
    };

    test("Then it should call the next function with a 409 and 'El usuario ya existe' message", async () => {
      const error = new ServerError(409, "El usuario ya existe");

      const authController = new AuthController(
        authUserModel as Model<IUserStructure>,
      );

      await authController.registerUser(
        req as RegisterRequest,
        res as RegisterResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(error));
    });
  });
});
