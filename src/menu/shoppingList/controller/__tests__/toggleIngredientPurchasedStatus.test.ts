import { NextFunction, Response } from "express";
import { IngredientRequest, IngredientResponse } from "../types.js";
import {
  shoppingList,
  tomate,
  tomatePurchased,
  updateShoppingList,
} from "../../fixtures/fixtures.js";
import { Model } from "mongoose";
import { ShoppingListStructure } from "../../types.js";
import ShoppingListController from "../ShoppingListController.js";
import ServerError from "../../../../server/serverError/serverError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the toggleIngredientPurchasedStatus method of ShoppingListController", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a Tomate ingredient that isn`t purchased", () => {
    const req: Pick<IngredientRequest, "params"> = {
      params: { ingredientId: tomate._id },
    };

    const shoppingModel: Pick<
      Model<ShoppingListStructure>,
      "findOne" | "findOneAndUpdate"
    > = {
      findOne: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(shoppingList) }),
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(updateShoppingList),
      }),
    };

    test("Then it should call the received response's methos status with 200 code", async () => {
      const shoppingController = new ShoppingListController(
        shoppingModel as Model<ShoppingListStructure>,
      );

      await shoppingController.toggleIngredientPurchasedStatus(
        req as IngredientRequest,
        res as IngredientResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("Then it should call the response's method json with Tomate purchased", async () => {
      const shoppingController = new ShoppingListController(
        shoppingModel as Model<ShoppingListStructure>,
      );

      await shoppingController.toggleIngredientPurchasedStatus(
        req as IngredientRequest,
        res as IngredientResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({
        ingredient: tomatePurchased,
      });
    });
  });

  describe("When it receives a 'f7b34a4c8a6d9c05e3b7218a' id but the shoppingList is not exist", () => {
    const req: Pick<IngredientRequest, "params"> = {
      params: { ingredientId: "f7b34a4c8a6d9c05e3b7218a" },
    };

    const shoppingModel: Pick<
      Model<ShoppingListStructure>,
      "findOne" | "findOneAndUpdate"
    > = {
      findOne: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) }),
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };
    test("Then it should call the next function with 404,'Shopping list not found'", async () => {
      const error = new ServerError(404, "Shopping list not found");

      const shoppingController = new ShoppingListController(
        shoppingModel as Model<ShoppingListStructure>,
      );

      await shoppingController.toggleIngredientPurchasedStatus(
        req as IngredientRequest,
        res as IngredientResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a 'f7b34a4c8a6d9c05e3b7218a' id but the ingredient isn`t exist in the shoppingList", () => {
    const req: Pick<IngredientRequest, "params"> = {
      params: { ingredientId: "f7b34a4c8a6d9c05e3b7218a" },
    };

    const shoppingModel: Pick<
      Model<ShoppingListStructure>,
      "findOne" | "findOneAndUpdate"
    > = {
      findOne: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(shoppingList) }),
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    test("Then it should call the next function with 404,'ingredient not found'", async () => {
      const error = new ServerError(404, "Ingredient not found");

      const shoppingController = new ShoppingListController(
        shoppingModel as Model<ShoppingListStructure>,
      );

      await shoppingController.toggleIngredientPurchasedStatus(
        req as IngredientRequest,
        res as IngredientResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
