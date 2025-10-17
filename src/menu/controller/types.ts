import { Request, Response } from "express";

export interface ShoppingListControllerStructure {
  getShoppingList: (req: Request, res: Response) => Promise<void>;
}
