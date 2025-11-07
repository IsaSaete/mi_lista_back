import { Request, Response } from "express";
import { Model } from "mongoose";
import { WeeklyMenuStructure } from "../../types.js";
import {
  monday,
  mondayEmpty,
  tuesday,
  weeklyMenu,
  weeklyMenuEmpty,
} from "../../fixtures/fixtures.js";
import WeeklyMenuController from "../WeeklyMenuController.js";
import { WeeklyMenuRequest, WeeklyMenuResponse } from "../types.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the getWeeklyMenu method of weeklyMenuController", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a request for an existing menu with day 'M'", () => {
    const req: Pick<Request, "query"> = { query: { day: "M" } };

    const weeklyMenuModel: Pick<Model<WeeklyMenuStructure>, "findOne"> = {
      findOne: jest.fn().mockResolvedValue(weeklyMenu),
    };

    test("Then it should call the response's method with status code 200 ", async () => {
      const expectedStatus = 200;

      const weeklyMenuController = new WeeklyMenuController(
        weeklyMenuModel as Model<WeeklyMenuStructure>,
      );

      await weeklyMenuController.getWeeklyMenu(
        req as WeeklyMenuRequest,
        res as WeeklyMenuResponse,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with Tuesday's menu data", async () => {
      const weeklyMenuController = new WeeklyMenuController(
        weeklyMenuModel as Model<WeeklyMenuStructure>,
      );

      await weeklyMenuController.getWeeklyMenu(
        req as WeeklyMenuRequest,
        res as WeeklyMenuResponse,
      );

      expect(res.json).toHaveBeenCalledWith(tuesday);
    });
  });

  describe("When it receives a request without day query parameter", () => {
    const req: Pick<Request, "query"> = { query: { day: "" } };

    const weeklyMenuModel: Pick<Model<WeeklyMenuStructure>, "findOne"> = {
      findOne: jest.fn().mockResolvedValue(weeklyMenu),
    };

    test("Then it should call the response's method json with the default Monday's menu data, 'L'", async () => {
      const weeklyMenuController = new WeeklyMenuController(
        weeklyMenuModel as Model<WeeklyMenuStructure>,
      );

      await weeklyMenuController.getWeeklyMenu(
        req as WeeklyMenuRequest,
        res as WeeklyMenuResponse,
      );

      expect(res.json).toHaveBeenCalledWith(monday);
    });
  });

  describe("When it receives the first request and no menu exists in database", () => {
    const req: Pick<Request, "query"> = { query: { day: "" } };

    const weeklyMenuModel: Pick<
      Model<WeeklyMenuStructure>,
      "findOne" | "create"
    > = {
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue(weeklyMenuEmpty),
    };

    test("Then it should call the response's method status with a 200", async () => {
      const weeklyMenuController = new WeeklyMenuController(
        weeklyMenuModel as Model<WeeklyMenuStructure>,
      );

      await weeklyMenuController.getWeeklyMenu(
        req as WeeklyMenuRequest,
        res as WeeklyMenuResponse,
      );

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("Then it should call the response's method json with a empty menu structure for Monday's", async () => {
      const weeklyMenuController = new WeeklyMenuController(
        weeklyMenuModel as Model<WeeklyMenuStructure>,
      );

      await weeklyMenuController.getWeeklyMenu(
        req as WeeklyMenuRequest,
        res as WeeklyMenuResponse,
      );

      expect(res.json).toHaveBeenCalledWith(mondayEmpty);
    });
  });
});
