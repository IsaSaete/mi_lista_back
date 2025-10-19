import { Model } from "mongoose";
import { ShoppingListStructure } from "../types.js";
import { ShoppingListControllerStructure } from "./types.js";
import { Request, Response } from "express";

class ShoppingListController implements ShoppingListControllerStructure {
  constructor(
    private readonly shopingListModel: Model<ShoppingListStructure>,
  ) {}

  public getShoppingList = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const shoppingList = await this.shopingListModel.findOne().lean();

    res.status(200).json({ shoppingList });
  };
}

export default ShoppingListController;
