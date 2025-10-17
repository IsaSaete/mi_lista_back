import { Request, Response } from "express";
import ServerError from "../../serverError/serverError.js";
import handleErrors from "./handleErrors.js";

describe("Given the handleErrors middleware", () => {
  const req = {} as Request;
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("When it receives a response and a '404, Endpoint not found' error", () => {
    const error = new ServerError(404, "Endpoint not found");

    test("Then it should call the response's method status with '404' status code", () => {
      handleErrors(error, req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(error.statusCode);
    });

    test("Then it should call the response's method json with an 'Endpoint not found' error message", () => {
      handleErrors(error, req, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe("When it receives a response without status code and 'Can't read properties of undefined'error message", () => {
    const error = new Error("Can't read properties of undefined");

    test("Then it should call the response's method with '500' status code", () => {
      const expectedStatus = 500;

      handleErrors(error as ServerError, req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method with 'Internal server error' message", () => {
      const expectedMessageError = "Internal server error";

      handleErrors(error as ServerError, req, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ error: expectedMessageError });
    });
  });
});
