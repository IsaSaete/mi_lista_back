import { Model } from "mongoose";
import { IngredientData, ShoppingListStructure } from "../types.js";
import {
  NewIngredientRequest,
  NewIngredientResponse,
  ShoppingListControllerStructure,
  ShoppingListResponse,
} from "./types.js";
import { NextFunction, Request } from "express";
import ServerError from "../../server/serverError/serverError.js";

class ShoppingListController implements ShoppingListControllerStructure {
  constructor(
    private readonly shopingListModel: Model<ShoppingListStructure>,
  ) {}

  public getShoppingList = async (
    req: Request,
    res: ShoppingListResponse,
    next: NextFunction,
  ): Promise<void> => {
    const shoppingList = await this.shopingListModel.findOne().lean();

    if (!shoppingList) {
      const error = new ServerError(404, "Shopping List not found");

      next(error);

      return;
    }

    res.status(200).json({ shoppingList });
  };

  public addIngredient = async (
    req: NewIngredientRequest,
    res: NewIngredientResponse,
  ): Promise<void> => {
    const { name: ingredientName } = req.body;

    const newIngredient: IngredientData = {
      name: ingredientName,
      category: "otros",
      purchasedAt: false,
      createdAt: new Date(),
    };

    await this.shopingListModel.updateOne(
      {},
      { $push: { ingredients: newIngredient } },
    );

    res.status(201).json({ ingredient: newIngredient });
  };
}

export default ShoppingListController;
