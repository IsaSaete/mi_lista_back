import { Model } from "mongoose";
import { ShoppingListStructure } from "../../types.js";
import ShoppingListController from "../ShoppingListController.js";
import { NextFunction, Request, Response } from "express";
import { shoppingListFixtures } from "../../fixtures/fixtures.js";
import ServerError from "../../../server/serverError/serverError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the getShoppingList method of ShoppingListController", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a response", () => {
    const req = {} as Request;

    const shoppingListModel: Pick<Model<ShoppingListStructure>, "findOne"> = {
      findOne: jest.fn().mockReturnValue({
        lean: jest
          .fn()
          .mockResolvedValue({ ingredients: shoppingListFixtures }),
      }),
    };

    test("Then it should call the response'e method with a status 200", async () => {
      const shoppingListControoler = new ShoppingListController(
        shoppingListModel as Model<ShoppingListStructure>,
      );

      await shoppingListControoler.getShoppingList(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("Then it should call the response's method json with a shoppingList containing the ingredients", async () => {
      const shoppingListController = new ShoppingListController(
        shoppingListModel as Model<ShoppingListStructure>,
      );

      await shoppingListController.getShoppingList(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          shoppingList: { ingredients: shoppingListFixtures },
        }),
      );
    });
  });

  describe("When it receivas a response but the shoppingList doesnt`t exist", () => {
    const req = {} as Request;

    const shoppingListModel: Pick<Model<ShoppingListStructure>, "findOne"> = {
      findOne: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      }),
    };

    test("Then it should call the next function with 404, 'Shopping List not found'", async () => {
      const error = new ServerError(404, "Shopping List not found");
      const shoppingListController = new ShoppingListController(
        shoppingListModel as Model<ShoppingListStructure>,
      );

      await shoppingListController.getShoppingList(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
