import { NextFunction, Request, Response } from "express";
import {
  DayOfWeek,
  MealStructure,
  MenuDayData,
  WeeklyMenuData,
} from "../types.js";

export interface WeeklyMenuControllerStructure {
  addNewMeal: (
    req: NewMealRequest,
    res: NewMealResponse,
    next: NextFunction,
  ) => Promise<void>;
  getWeeklyMenu: (
    req: Request,
    res: WeeklyMenuResponse,
    next: NextFunction,
  ) => Promise<void>;
}

export type MealType = "lunch" | "dinner";

export type WeeklyMenuQuery = { day: DayOfWeek };

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

export type NewMealBodyResponse = MenuDayData;

export type NewMealResponse = Response<NewMealBodyResponse>;

export type WeeklyMenuResponse = Response<WeeklyMenuBodyResponse>;

export type WeeklyMenuBodyResponse = WeeklyMenuData;
