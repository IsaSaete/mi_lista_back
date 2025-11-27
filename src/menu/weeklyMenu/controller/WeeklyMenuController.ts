import { Model } from "mongoose";
import {
  NewMealBodyResponse,
  NewMealRequest,
  NewMealResponse,
  WeeklyMenuControllerStructure,
  WeeklyMenuResponse,
} from "./types.js";
import { WeeklyMenuStructure } from "../types.js";
import { NextFunction, Request } from "express";
import ServerError from "../../../server/serverError/serverError.js";

class WeeklyMenuController implements WeeklyMenuControllerStructure {
  constructor(private readonly weeklyMenuModel: Model<WeeklyMenuStructure>) {}

  public addNewMeal = async (
    req: NewMealRequest,
    res: NewMealResponse,
    next: NextFunction,
  ): Promise<void> => {
    const { day, mealType, mealData } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      const error = new ServerError(401, "Usuario no autenticado");

      next(error);

      return;
    }

    const updateMenu = await this.weeklyMenuModel.findOneAndUpdate(
      { userId },
      {
        [`weeklyMenu.${day}.${mealType}`]: mealData,
      },
      {
        new: true,
        upsert: true,
      },
    );

    if (!updateMenu) {
      const error = new ServerError(500, "Error al actualizar el menú");

      next(error);

      return;
    }

    const responseData: NewMealBodyResponse = {
      weeklyMenu: {
        [day]: {
          [mealType]: mealData,
        },
      },
    };

    res.status(200).json(responseData);
  };

  public getWeeklyMenu = async (
    req: Request,
    res: WeeklyMenuResponse,
    next: NextFunction,
  ): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
      const error = new ServerError(401, "Usuario no autenticado");

      next(error);

      return;
    }

    let menu = await this.weeklyMenuModel.findOne({ userId });

    if (!menu) {
      menu = await this.weeklyMenuModel.create({
        userId,
        weeklyMenu: {
          L: { lunch: {}, dinner: {} },
          M: { lunch: {}, dinner: {} },
          X: { lunch: {}, dinner: {} },
          J: { lunch: {}, dinner: {} },
          V: { lunch: {}, dinner: {} },
          S: { lunch: {}, dinner: {} },
          D: { lunch: {}, dinner: {} },
        },
      });

      res.status(201).json(menu.weeklyMenu);

      return;
    }

    res.status(200).json(menu.weeklyMenu);
  };
}

export default WeeklyMenuController;
