import { Model } from "mongoose";
import {
  NewMealBodyResponse,
  NewMealRequest,
  NewMealResponse,
  WeeklyMenuControllerStructure,
} from "./types.js";
import { WeeklyMenuStructure } from "../types.js";
import { NextFunction } from "express";
import ServerError from "../../../server/serverError/serverError.js";

class WeeklyMenuController implements WeeklyMenuControllerStructure {
  constructor(private readonly weeklyMenuModel: Model<WeeklyMenuStructure>) {}

  public addNewMeal = async (
    req: NewMealRequest,
    res: NewMealResponse,
    next: NextFunction,
  ): Promise<void> => {
    const { day, mealType, mealData } = req.body;

    const updateMenu = await this.weeklyMenuModel.findOneAndUpdate(
      {},
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
}

export default WeeklyMenuController;
