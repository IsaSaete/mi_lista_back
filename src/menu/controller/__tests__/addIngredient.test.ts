import { Response } from "express";
import { NewIngredientRequest, NewIngredientResponse } from "../types.js";
import { ShoppingListStructure } from "../../types.js";
import { Model } from "mongoose";
import { alcachofa } from "../../fixtures/fixturesDto.js";
import ShoppingListController from "../ShoppingListController.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the addIngredient method", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a 'Alcachofas' as ingredient name", () => {
    const req: Pick<NewIngredientRequest, "body"> = {
      body: { name: "Alcachofas" },
    };

    const shoppingModel: Pick<Model<ShoppingListStructure>, "updateOne"> = {
      updateOne: jest.fn().mockResolvedValue(alcachofa),
    };

    test("Then it should call the response's method with 201 status code", async () => {
      const shoppingListController = new ShoppingListController(
        shoppingModel as Model<ShoppingListStructure>,
      );

      await shoppingListController.addIngredient(
        req as NewIngredientRequest,
        res as NewIngredientResponse,
      );

      expect(res.status).toHaveBeenCalledWith(201);
    });

    test("Then it should call the response's method json with 'Alcachofa' ingredient data", async () => {
      const expectedIngredient = {
        name: "Alcachofas",
        category: "otros",
        purchasedAt: false,
      };

      const shoppingListController = new ShoppingListController(
        shoppingModel as Model<ShoppingListStructure>,
      );

      await shoppingListController.addIngredient(
        req as NewIngredientRequest,
        res as NewIngredientResponse,
      );

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          ingredient: expect.objectContaining(expectedIngredient),
        }),
      );
    });
  });
});
