import { Model } from "mongoose";
import {
  NewMealRequest,
  NewMealResponse,
  WeeklyMenuControllerStructure,
} from "./types.js";
import { WeeklyMenuStructure } from "../types.js";

class WeeklyMenuController implements WeeklyMenuControllerStructure {
  constructor(private readonly weeklyMenuModel: Model<WeeklyMenuStructure>) {}

  public addNewMeal = async (
    req: NewMealRequest,
    res: NewMealResponse,
  ): Promise<void> => {
    const newMeal = req.body;

    const createdMenu = await this.weeklyMenuModel.create({
      weeklyMenu: newMeal,
    });

    res.status(201).json({ weeklyMenu: createdMenu.weeklyMenu });
  };
}

export default WeeklyMenuController;
