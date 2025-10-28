import { Model } from "mongoose";
import { IngredientData, ShoppingListStructure } from "../types.js";
import {
  IngredientRequest,
  IngredientResponse,
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
      isPurchased: false,
      createdAt: new Date(),
    };

    await this.shopingListModel.updateOne(
      {},
      { $push: { ingredients: newIngredient } },
    );

    res.status(201).json({ ingredient: newIngredient });
  };

  public toggleIngredientPurchasedStatus = async (
    req: IngredientRequest,
    res: IngredientResponse,
    next: NextFunction,
  ): Promise<void> => {
    const { ingredientId } = req.params;

    const shoppingList = await this.shopingListModel
      .findOne({ "ingredients._id": ingredientId })
      .exec();

    if (!shoppingList) {
      const error = new ServerError(404, "Shopping list not found");

      next(error);

      return;
    }

    const ingredient = shoppingList.ingredients.find(
      (ingredient) => ingredient._id.toString() === ingredientId,
    );

    if (!ingredient) {
      const error = new ServerError(404, "Ingredient not found");

      next(error);

      return;
    }

    const isPurchasedToggled = !ingredient.isPurchased;

    const updatedShoppingList = await this.shopingListModel
      .findOneAndUpdate(
        { "ingredients._id": ingredientId },
        { $set: { "ingredients.$.isPurchased": isPurchasedToggled } },
        { new: true },
      )
      .exec();

    if (!updatedShoppingList) {
      const error = new ServerError(404, "Ingredient not found");

      next(error);

      return;
    }

    const updatedIngredient = updatedShoppingList.ingredients.find(
      (ingredient) => ingredient._id.toString() === ingredientId,
    );

    if (!updatedIngredient) {
      const error = new ServerError(404, "Ingredient not found");
      next(error);
      return;
    }

    res.status(200).json({ ingredient: updatedIngredient });
  };
}

export default ShoppingListController;
