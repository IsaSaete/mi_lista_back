import { NextFunction, Response } from "express";
import { Model } from "mongoose";
import { IngredientRequest, IngredientResponse } from "../types.js";
import {
  shoppingListUser1,
  tomate,
  updateShoppingListUser1,
} from "../../fixtures/fixtures.js";
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
    const req: Pick<IngredientRequest, "params" | "user"> = {
      params: { ingredientId: tomate._id },
      user: {
        userId: "507f1f77bcf86cd799439011",
      },
    };

    const shoppingModel: Pick<
      Model<ShoppingListStructure>,
      "findOne" | "findOneAndUpdate"
    > = {
      findOne: jest.fn().mockReturnValue(shoppingListUser1),
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(updateShoppingListUser1),
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

    test("Then it should call the response's method json with Tomate isPurchased propery true", async () => {
      const shoppingController = new ShoppingListController(
        shoppingModel as Model<ShoppingListStructure>,
      );

      await shoppingController.toggleIngredientPurchasedStatus(
        req as IngredientRequest,
        res as IngredientResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({
        ingredient: expect.objectContaining({ isPurchased: true }),
      });
    });
  });

  describe("When it receives a 'f7b34a4c8a6d9c05e3b7218a' id but the shoppingList isn't exist", () => {
    const req: Pick<IngredientRequest, "params" | "user"> = {
      params: { ingredientId: "f7b34a4c8a6d9c05e3b7218a" },
      user: {
        userId: "507f1f77bcf86cd799439011",
      },
    };

    const shoppingModel: Pick<
      Model<ShoppingListStructure>,
      "findOne" | "findOneAndUpdate"
    > = {
      findOne: jest.fn().mockReturnValue(null),
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    test("Then it should call the next function with 404,'Lista de la compra no encontrada'", async () => {
      const error = new ServerError(404, "Lista de la compra no encontrada");

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

  describe("When it receives a 'f7b34a4c8a6d9c05e3b7218a' id but the ingredient isn't exist", () => {
    const req: Pick<IngredientRequest, "params" | "user"> = {
      params: { ingredientId: "f7b34a4c8a6d9c05e3b7218a" },
      user: {
        userId: "507f1f77bcf86cd799439010",
      },
    };

    const shoppingModel: Pick<
      Model<ShoppingListStructure>,
      "findOne" | "findOneAndUpdate"
    > = {
      findOne: jest.fn().mockReturnValue(shoppingListUser1),
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    test("Then it should call the next function with 404,'Ingrediente no encontrado'", async () => {
      const error = new ServerError(404, "Ingrediente no encontrado");

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

  describe("When it receives a request with Tomate ingrediente but it can`t be toggled", () => {
    const req: Pick<IngredientRequest, "params" | "user"> = {
      params: { ingredientId: tomate._id },
      user: {
        userId: "507f1f77bcf86cd799439011",
      },
    };

    const shoppingModel: Pick<
      Model<ShoppingListStructure>,
      "findOne" | "findOneAndUpdate"
    > = {
      findOne: jest.fn().mockReturnValue(shoppingListUser1),
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    test("Then it should call the next function with 500, 'Error al actualizar el ingrediente'", async () => {
      const error = new ServerError(500, "Error al actualizar el ingrediente");

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

  describe("When it reveives a request with Tomate ingredient but the user is not authenticated", () => {
    const req: Pick<IngredientRequest, "params"> = {
      params: { ingredientId: tomate._id },
    };

    const shoppingModel: Pick<
      Model<ShoppingListStructure>,
      "findOne" | "findOneAndUpdate"
    > = {
      findOne: jest.fn().mockReturnValue(shoppingListUser1),
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };
    test("Then it should call the next function with a 401, 'Usuario no autenticado'", async () => {
      const error = new ServerError(401, "Usuario no autenticado");

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
