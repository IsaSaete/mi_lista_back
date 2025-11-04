import { Request, Response } from "express";
import { NewMealData } from "../types.js";

export interface WeeklyMenuControllerStructure {
  addNewMeal: (req: NewMealRequest, res: NewMealResponse) => Promise<void>;
}

export type NewMealRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  NewMealBody,
  Record<string, unknown>
>;

export type NewMealBody = NewMealData;

export type NewMealBodyResponse = { weeklyMenu: NewMealData };

export type NewMealResponse = Response<NewMealBodyResponse>;
