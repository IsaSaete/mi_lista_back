import { NextFunction, Response } from "express";
import { Model } from "mongoose";
import {
  aceiteOliva,
  shoppingListWithAceite,
  shoppingListWithoutAceite,
} from "../../fixtures/fixtures.js";
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
    const req: Pick<IngredientRequest, "params" | "user"> = {
      params: { ingredientId: aceiteOliva._id },
      user: {
        userId: "507f1f77bcf86cd799439011",
      },
    };

    const shopingListModel: Pick<
      Model<ShoppingListStructure>,
      "findOne" | "findOneAndUpdate"
    > = {
      findOne: jest.fn().mockReturnValue(shoppingListWithAceite),
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(shoppingListWithoutAceite),
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
    const req: Pick<IngredientRequest, "params" | "user"> = {
      params: { ingredientId: "f7b34a4c8a6d9c05e3b7218a" },
      user: {
        userId: "507f1f77bcf86cd799439010",
      },
    };

    const shopingListModel: Pick<
      Model<ShoppingListStructure>,
      "findOne" | "findOneAndUpdate"
    > = {
      findOne: jest.fn().mockReturnValue(shoppingListWithAceite),
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(shoppingListWithoutAceite),
      }),
    };

    test("Then it should call the next function with 404,'Ingredient not found", async () => {
      const error = new ServerError(404, "Ingrediente no encontrado");

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

  describe("When it receives a 'f7b34a4c8a6d9c05e3b7218a' but the shopping list isn't exist", () => {
    const req: Pick<IngredientRequest, "params" | "user"> = {
      params: { ingredientId: "f7b34a4c8a6d9c05e3b7218a" },
      user: {
        userId: "507f1f77bcf86cd799439011",
      },
    };

    const shopingListModel: Pick<
      Model<ShoppingListStructure>,
      "findOne" | "findOneAndUpdate"
    > = {
      findOne: jest.fn().mockReturnValue(null),
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    test("Then it should call the next function with 404, 'Shoppinglist no encontrada'", async () => {
      const error = new ServerError(404, "Shoppinglist no encontrada");

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

  describe("When it receives a request with Aceite de oliva id but it can't be deleted", () => {
    const req: Pick<IngredientRequest, "params" | "user"> = {
      params: { ingredientId: aceiteOliva._id },
      user: {
        userId: "507f1f77bcf86cd799439011",
      },
    };

    const shopingListModel: Pick<
      Model<ShoppingListStructure>,
      "findOne" | "findOneAndUpdate"
    > = {
      findOne: jest.fn().mockReturnValue(shoppingListWithAceite),
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    test("Then it should call the next function with 500, 'Error al eliminar el ingrediente", async () => {
      const error = new ServerError(500, "Error al eliminar el ingrediente");

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

  describe("When it receives a request with Aceite de oliva id but the user is not authenticated", () => {
    const req: Pick<IngredientRequest, "params"> = {
      params: { ingredientId: aceiteOliva._id },
    };

    const shopingListModel: Pick<
      Model<ShoppingListStructure>,
      "findOne" | "findOneAndUpdate"
    > = {
      findOne: jest.fn().mockReturnValue(null),
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    test("Then it should call the next function with a 401, 'Usuario no autenticado", async () => {
      const error = new ServerError(401, "Usuario no autenticado");

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
