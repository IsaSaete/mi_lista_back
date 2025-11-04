import { Response } from "express";
import { NewMealRequest, NewMealResponse } from "../types.js";
import { tuesdayLunch } from "../../fixtures/fixtures.js";
import { WeeklyMenuStructure } from "../../types.js";
import { Model } from "mongoose";
import WeeklyMenuController from "../WeeklyMenuController.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the addNewMeal method", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a tueday lunch data", () => {
    const req: Pick<NewMealRequest, "body"> = {
      body: tuesdayLunch,
    };

    const weeklyMenuModel: Pick<Model<WeeklyMenuStructure>, "create"> = {
      create: jest.fn().mockResolvedValue({ weeklyMenu: tuesdayLunch }),
    };

    test("Then it should call the response's method with 201 status code", async () => {
      const weeklyMenuController = new WeeklyMenuController(
        weeklyMenuModel as Model<WeeklyMenuStructure>,
      );

      await weeklyMenuController.addNewMeal(
        req as NewMealRequest,
        res as NewMealResponse,
      );

      expect(res.status).toHaveBeenCalledWith(201);
    });

    test("Then it should call the response's method json with tuesday lunc data", async () => {
      const weeklyMenuController = new WeeklyMenuController(
        weeklyMenuModel as Model<WeeklyMenuStructure>,
      );

      await weeklyMenuController.addNewMeal(
        req as NewMealRequest,
        res as NewMealResponse,
      );

      expect(res.json).toHaveBeenCalledWith({ weeklyMenu: tuesdayLunch });
    });
  });
});
