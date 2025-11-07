import { NextFunction, Response } from "express";
import { NewMealRequest, NewMealResponse } from "../types.js";
import { WeeklyMenuStructure } from "../../types.js";
import { Model } from "mongoose";
import WeeklyMenuController from "../WeeklyMenuController.js";
import {
  tuesdayLunchRequest,
  tuesdayLunchResponse,
} from "../../fixtures/fixtures.js";
import ServerError from "../../../../server/serverError/serverError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the addNewMeal method", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a tueday lunch data", () => {
    const req: Pick<NewMealRequest, "body"> = {
      body: tuesdayLunchRequest,
    };

    const weeklyMenuModel: Pick<
      Model<WeeklyMenuStructure>,
      "findOneAndUpdate"
    > = {
      findOneAndUpdate: jest.fn().mockResolvedValue(tuesdayLunchResponse),
    };

    test("Then it should call the response's method with 200 status code", async () => {
      const expectedStatusCode = 200;

      const weeklyMenuController = new WeeklyMenuController(
        weeklyMenuModel as Model<WeeklyMenuStructure>,
      );

      await weeklyMenuController.addNewMeal(
        req as NewMealRequest,
        res as NewMealResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with tuesday lunch data", async () => {
      const weeklyMenuController = new WeeklyMenuController(
        weeklyMenuModel as Model<WeeklyMenuStructure>,
      );

      await weeklyMenuController.addNewMeal(
        req as NewMealRequest,
        res as NewMealResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith(tuesdayLunchResponse);
    });

    describe("When it receives a tuesday lunch data but the database update fails", () => {
      const req: Pick<NewMealRequest, "body"> = {
        body: tuesdayLunchRequest,
      };

      const weeklyMenuModel: Pick<
        Model<WeeklyMenuStructure>,
        "findOneAndUpdate"
      > = {
        findOneAndUpdate: jest.fn().mockResolvedValue(null),
      };

      test("Then it should call the next function with a 500 status code and 'Error al actualizar el menu'", async () => {
        const expectedError = new ServerError(
          500,
          "Error al actualizar el menú",
        );

        const weeklyMenuController = new WeeklyMenuController(
          weeklyMenuModel as Model<WeeklyMenuStructure>,
        );

        await weeklyMenuController.addNewMeal(
          req as NewMealRequest,
          res as NewMealResponse,
          next as NextFunction,
        );

        expect(next).toHaveBeenCalledWith(expectedError);
      });
    });
  });
});
