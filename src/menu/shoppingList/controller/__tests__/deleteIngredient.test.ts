import { NextFunction, Response } from "express";
import { aceiteOliva, updateShoppingList } from "../../fixtures/fixtures.js";
import { Model } from "mongoose";
import { ShoppingListStructure } from "../../types.js";
import ShoppingListController from "../ShoppingListController.js";
import { IngredientRequest, IngredientResponse } from "../types.js";
import ServerError from "../../../../server/serverError/serverError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the deletIngredient method of controller", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with Aceite de oliva id", () => {
    const req: Pick<IngredientRequest, "params"> = {
      params: { ingredientId: aceiteOliva._id },
    };

    const shopingListModel: Pick<
      Model<ShoppingListStructure>,
      "findOneAndUpdate"
    > = {
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(updateShoppingList),
      }),
    };

    test("Then it should call the received response's method status with 200", async () => {
      const expectedStatus = 200;

      const shoppingListController = new ShoppingListController(
        shopingListModel as Model<ShoppingListStructure>,
      );

      await shoppingListController.deleteIngredient(
        req as IngredientRequest,
        res as IngredientResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the received response's method json with Acete de oliva ingredient", async () => {
      const shoppingListController = new ShoppingListController(
        shopingListModel as Model<ShoppingListStructure>,
      );

      await shoppingListController.deleteIngredient(
        req as IngredientRequest,
        res as IngredientResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ ingredient: aceiteOliva });
    });
  });

  describe("When it receives a 'f7b34a4c8a6d9c05e3b7218a' but the ingredient isn't exist", () => {
    const req: Pick<IngredientRequest, "params"> = {
      params: { ingredientId: "f7b34a4c8a6d9c05e3b7218a" },
    };

    const shopingListModel: Pick<
      Model<ShoppingListStructure>,
      "findOneAndUpdate"
    > = {
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(updateShoppingList),
      }),
    };

    test("Then it should call the next function with 404,'Ingredient not found", async () => {
      const error = new ServerError(404, "Ingredient not found");

      const shoppingListController = new ShoppingListController(
        shopingListModel as Model<ShoppingListStructure>,
      );

      await shoppingListController.deleteIngredient(
        req as IngredientRequest,
        res as IngredientResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a 'f7b34a4c8a6d9c05e3b7218a' but the list shopping isn't exist", () => {
    const req: Pick<IngredientRequest, "params"> = {
      params: { ingredientId: "f7b34a4c8a6d9c05e3b7218a" },
    };

    const shopingListModel: Pick<
      Model<ShoppingListStructure>,
      "findOneAndUpdate"
    > = {
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    test("Then it should call the next function with 404, 'Shopping list not found", async () => {
      const error = new ServerError(404, "Shopping list not found");

      const shoppingListController = new ShoppingListController(
        shopingListModel as Model<ShoppingListStructure>,
      );

      await shoppingListController.deleteIngredient(
        req as IngredientRequest,
        res as IngredientResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
