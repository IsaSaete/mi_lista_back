import mongoose, { Model } from "mongoose";
import { NextFunction, Request } from "express";
import { IngredientStructure, ShoppingListStructure } from "../types.js";
import {
  IngredientRequest,
  IngredientResponse,
  NewIngredientRequest,
  NewIngredientResponse,
  ShoppingListControllerStructure,
  ShoppingListResponse,
} from "./types.js";
import ServerError from "../../../server/serverError/serverError.js";

class ShoppingListController implements ShoppingListControllerStructure {
  constructor(
    private readonly shopingListModel: Model<ShoppingListStructure>,
  ) {}

  public getShoppingList = async (
    req: Request,
    res: ShoppingListResponse,
    next: NextFunction,
  ): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
      const error = new ServerError(401, "Usuario no autenticado");

      next(error);

      return;
    }

    const shoppingList = await this.shopingListModel.findOne({ userId }).lean();

    if (!shoppingList) {
      const error = new ServerError(404, "Lista de la compra no encontrada");

      next(error);

      return;
    }

    res.status(200).json({ shoppingList });
  };

  public addIngredient = async (
    req: NewIngredientRequest,
    res: NewIngredientResponse,
    next: NextFunction,
  ): Promise<void> => {
    const { name: ingredientName } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      const error = new ServerError(401, "Usuario no autenticado");

      next(error);

      return;
    }

    const newIngredientId = new mongoose.Types.ObjectId();

    const newIngredient: IngredientStructure = {
      _id: newIngredientId.toString(),
      name: ingredientName,
      category: "otros",
      isPurchased: false,
      createdAt: new Date(),
    };

    const shoppingList = await this.shopingListModel.findOneAndUpdate(
      { userId },
      {
        $push: { ingredients: newIngredient },
        $set: { updatedAt: new Date() },
      },
      { new: true, upsert: true },
    );

    if (!shoppingList) {
      const error = new ServerError(404, "Lista de la compra no encontrada");
      next(error);
      return;
    }

    res.status(201).json({ ingredient: newIngredient });
  };

  public toggleIngredientPurchasedStatus = async (
    req: IngredientRequest,
    res: IngredientResponse,
    next: NextFunction,
  ): Promise<void> => {
    const { ingredientId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      const error = new ServerError(401, "Usuario no autenticado");

      next(error);

      return;
    }

    const shoppingList = await this.shopingListModel.findOne({ userId });

    if (!shoppingList) {
      const error = new ServerError(404, "Lista de la compra no encontrada");

      next(error);

      return;
    }

    const ingredientToToggle = shoppingList.ingredients.find(
      (ingredient) => ingredient._id.toString() === ingredientId,
    );

    if (!ingredientToToggle) {
      const error = new ServerError(404, "Ingrediente no encontrado");

      next(error);

      return;
    }
    const updatedIngredient = {
      ...ingredientToToggle,
      isPurchased: !ingredientToToggle.isPurchased,
      updatedAt: new Date(),
    };

    const updatedShoppingList = await this.shopingListModel
      .findOneAndUpdate(
        { userId, "ingredients._id": ingredientId },
        {
          $set: {
            "ingredients.$.isPurchased": updatedIngredient.isPurchased,
            "ingredients.$.updatedAt": updatedIngredient.updatedAt,
          },
        },
        { new: true },
      )
      .exec();

    if (!updatedShoppingList) {
      const error = new ServerError(500, "Error al actualizar el ingrediente");

      next(error);

      return;
    }

    res.status(200).json({ ingredient: updatedIngredient });
  };

  public deleteIngredient = async (
    req: IngredientRequest,
    res: IngredientResponse,
    next: NextFunction,
  ): Promise<void> => {
    const { ingredientId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      const error = new ServerError(401, "Usuario no autenticado");

      next(error);

      return;
    }

    const shoppingList = await this.shopingListModel.findOne({ userId });

    if (!shoppingList) {
      const error = new ServerError(404, "Lista de la compra no encontrada");

      next(error);

      return;
    }

    const ingredientToDelete = shoppingList.ingredients.find(
      (ingredient) => ingredient._id.toString() === ingredientId,
    );

    if (!ingredientToDelete) {
      const error = new ServerError(404, "Ingrediente no encontrado");
      next(error);
      return;
    }

    const updatedShoppingList = await this.shopingListModel
      .findOneAndUpdate(
        { userId },
        { $pull: { ingredients: { _id: ingredientId } } },
        { new: true },
      )
      .exec();

    if (!updatedShoppingList) {
      const error = new ServerError(500, "Error al eliminar el ingrediente");
      next(error);
      return;
    }

    res.status(200).json({ ingredient: ingredientToDelete });
  };
}

export default ShoppingListController;
