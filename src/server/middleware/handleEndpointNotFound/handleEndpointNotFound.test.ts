import { NextFunction, Request, Response } from "express";
import handleEndpointNotFound from "./handleEndpointNotFound.js";
import ServerError from "../../serverError/serverError.js";

describe("Given the handleEndpointNotFound", () => {
  describe("When it receives a response", () => {
    test("Then it should call the received response method status with 404", () => {
      const error = new ServerError(404, "Endpoint not found");

      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();

      handleEndpointNotFound(req, res, next as NextFunction);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: error.statusCode,
          message: error.message,
        }),
      );
    });
  });
});
