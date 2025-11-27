import { NextFunction, Response } from "express";
import { Model } from "mongoose";
import { NewIngredientRequest, NewIngredientResponse } from "../types.js";
import { ShoppingListStructure } from "../../types.js";
import { alcachofa } from "../../fixtures/fixturesDto.js";
import ShoppingListController from "../ShoppingListController.js";

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
      "findOneAndUpdate"
    > = {
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
});
