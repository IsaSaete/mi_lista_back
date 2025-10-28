import { NextFunction, Request, Response } from "express";
import {
  IngredientData,
  IngredientStructure,
  ShoppingListStructure,
} from "../types.js";

export interface ShoppingListControllerStructure {
  getShoppingList: (
    req: Request,
    res: ShoppingListResponse,
    next: NextFunction,
  ) => Promise<void>;
  addIngredient: (
    req: NewIngredientRequest,
    res: NewIngredientResponse,
  ) => Promise<void>;
  toggleIngredientPurchasedStatus: (
    req: IngredientRequest,
    res: IngredientResponse,
    next: NextFunction,
  ) => Promise<void>;
}

export type NewIngredientBody = { name: string };

export type NewIngredientRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  NewIngredientBody,
  Record<string, unknown>
>;

export type ShoppingListBodyResponse = { shoppingList: ShoppingListStructure };

export type ShoppingListResponse = Response<ShoppingListBodyResponse>;

export type NewIngredientBodyResponse = { ingredient: IngredientData };

export type NewIngredientResponse = Response<NewIngredientBodyResponse>;

export type IngredientParams = { ingredientId: string };

export type IngredientBody = { ingredient: IngredientStructure };

export type IngredientRequest = Request<
  IngredientParams,
  Record<string, unknown>,
  IngredientBody,
  Record<string, unknown>
>;

export type IngredientResponse = Response<IngredientBody>;
