import { NextFunction, Response } from "express";
import { Model } from "mongoose";
import { NewIngredientRequest, NewIngredientResponse } from "../types.js";
import { ShoppingListStructure } from "../../types.js";
import { alcachofa } from "../../fixtures/fixturesDto.js";
import ShoppingListController from "../ShoppingListController.js";
import ServerError from "../../../../server/serverError/serverError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the addIngredient method of ShoppingListController", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a 'Alcachofas' as ingredient name", () => {
    const req: Pick<NewIngredientRequest, "body" | "user"> = {
      body: { name: "Alcachofas" },
      user: {
        userId: "507f1f77bcf86cd799439011",
      },
    };

    const shoppingListModel: Pick<
      Model<ShoppingListStructure>,
      "findOne" | "findOneAndUpdate"
    > = {
      findOne: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      }),
      findOneAndUpdate: jest.fn().mockResolvedValue({
        ingredients: [alcachofa],
      }),
    };

    test("Then it should call the response's method with 201 status code", async () => {
      const shoppingListController = new ShoppingListController(
        shoppingListModel as Model<ShoppingListStructure>,
      );

      await shoppingListController.addIngredient(
        req as NewIngredientRequest,
        res as NewIngredientResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(201);
    });

    test("Then it should call the response's method json with 'Alcachofa' ingredient data", async () => {
      const expectedIngredient = {
        name: "Alcachofas",
        category: "otros",
        isPurchased: false,
      };

      const shoppingListController = new ShoppingListController(
        shoppingListModel as Model<ShoppingListStructure>,
      );

      await shoppingListController.addIngredient(
        req as NewIngredientRequest,
        res as NewIngredientResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          ingredient: expect.objectContaining(expectedIngredient),
        }),
      );
    });
  });

  describe("When the shopping list already contains the same ingredient (case-insensitive)", () => {
    const req: Pick<NewIngredientRequest, "body" | "user"> = {
      body: { name: "alcachofas" },
      user: {
        userId: "507f1f77bcf86cd799439011",
      },
    };

    const shoppingListModel: Pick<
      Model<ShoppingListStructure>,
      "findOne" | "findOneAndUpdate"
    > = {
      findOne: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue({
          ingredients: [alcachofa],
        }),
      }),
      findOneAndUpdate: jest.fn(),
    };

    test("Then it should call next with a 409 ServerError", async () => {
      const shoppingListController = new ShoppingListController(
        shoppingListModel as Model<ShoppingListStructure>,
      );

      await shoppingListController.addIngredient(
        req as NewIngredientRequest,
        res as NewIngredientResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 409,
          message: "Este ingrediente ya está en la lista",
        }),
      );
      expect(next.mock.calls[0][0]).toBeInstanceOf(ServerError);
      expect(shoppingListModel.findOneAndUpdate).not.toHaveBeenCalled();
    });
  });

  describe("When it receives an empty ingredient name", () => {
    const req: Pick<NewIngredientRequest, "body" | "user"> = {
      body: { name: "   " },
      user: {
        userId: "507f1f77bcf86cd799439011",
      },
    };

    const shoppingListModel: Pick<
      Model<ShoppingListStructure>,
      "findOne" | "findOneAndUpdate"
    > = {
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
    };

    test("Then it should call next with a 400 ServerError", async () => {
      const shoppingListController = new ShoppingListController(
        shoppingListModel as Model<ShoppingListStructure>,
      );

      await shoppingListController.addIngredient(
        req as NewIngredientRequest,
        res as NewIngredientResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 400,
          message: "El nombre del ingrediente es obligatorio",
        }),
      );

      expect(shoppingListModel.findOne).not.toHaveBeenCalled();
      expect(shoppingListModel.findOneAndUpdate).not.toHaveBeenCalled();
    });
  });
});
