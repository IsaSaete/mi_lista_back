import { NextFunction, Request, Response } from "express";
import { DayOfWeek, MealStructure, NewMealData } from "../types.js";

export interface WeeklyMenuControllerStructure {
  addNewMeal: (
    req: NewMealRequest,
    res: NewMealResponse,
    next: NextFunction,
  ) => Promise<void>;
}

export type MealType = "lunch" | "dinner";

export interface NewMealRequestBody {
  day: DayOfWeek;
  mealType: MealType;
  mealData: MealStructure;
}

export type NewMealRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  NewMealRequestBody,
  Record<string, unknown>
>;

export type NewMealBodyResponse = NewMealData;

export type NewMealResponse = Response<NewMealBodyResponse>;
