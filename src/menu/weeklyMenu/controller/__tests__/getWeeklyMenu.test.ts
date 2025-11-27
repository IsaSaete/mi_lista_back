import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import { WeeklyMenuStructure } from "../../types.js";
import { weeklyMenu, weeklyMenuEmpty } from "../../fixtures/fixtures.js";
import WeeklyMenuController from "../WeeklyMenuController.js";
import { WeeklyMenuResponse } from "../types.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the getWeeklyMenu method of weeklyMenuController", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request", () => {
    const req = {
      user: {
        userId: "507f1f77bcf86cd799439011",
      },
    } as Request;

    const weeklyMenuModel: Pick<Model<WeeklyMenuStructure>, "findOne"> = {
      findOne: jest.fn().mockResolvedValue(weeklyMenu),
    };

    test("Then it should call the response's method with status code 200 ", async () => {
      const expectedStatus = 200;

      const weeklyMenuController = new WeeklyMenuController(
        weeklyMenuModel as Model<WeeklyMenuStructure>,
      );

      await weeklyMenuController.getWeeklyMenu(
        req,
        res as WeeklyMenuResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with menu data", async () => {
      const weeklyMenuController = new WeeklyMenuController(
        weeklyMenuModel as Model<WeeklyMenuStructure>,
      );

      await weeklyMenuController.getWeeklyMenu(
        req,
        res as WeeklyMenuResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith(weeklyMenu.weeklyMenu);
    });
  });

  describe("When it receives the first request and no menu exists in database", () => {
    const req = {
      user: {
        userId: "507f1f77bcf86cd799439011",
      },
    } as Request;

    const weeklyMenuModel: Pick<
      Model<WeeklyMenuStructure>,
      "findOne" | "create"
    > = {
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue(weeklyMenuEmpty),
    };

    test("Then it should call the response's method status with a 201", async () => {
      const expectedStatus = 201;

      const weeklyMenuController = new WeeklyMenuController(
        weeklyMenuModel as Model<WeeklyMenuStructure>,
      );

      await weeklyMenuController.getWeeklyMenu(
        req,
        res as WeeklyMenuResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with a empty menu", async () => {
      const weeklyMenuController = new WeeklyMenuController(
        weeklyMenuModel as Model<WeeklyMenuStructure>,
      );

      await weeklyMenuController.getWeeklyMenu(
        req,
        res as WeeklyMenuResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith(weeklyMenuEmpty.weeklyMenu);
    });
  });
});
