import { model, Schema } from "mongoose";
import {
  DayMenuStructure,
  MealStructure,
  WeeklyMenuStructure,
} from "../types.js";

const mealSchema = new Schema<MealStructure>(
  {
    firstPlate: { type: String },
    secondPlate: { type: String },
    dessert: { type: String },
  },
  { _id: false, minimize: false },
);

const dayMenuSchema = new Schema<DayMenuStructure>(
  {
    lunch: { type: mealSchema },
    dinner: { type: mealSchema },
  },
  { _id: false, minimize: false },
);

const weeklyMenuSchema = new Schema<WeeklyMenuStructure>(
  {
    weeklyMenu: {
      L: { type: dayMenuSchema },
      M: { type: dayMenuSchema },
      X: { type: dayMenuSchema },
      J: { type: dayMenuSchema },
      V: { type: dayMenuSchema },
      S: { type: dayMenuSchema },
      D: { type: dayMenuSchema },
    },
  },
  { timestamps: true },
);

const WeeklyMenu = model("WeeklyMenu", weeklyMenuSchema, "weeklymenu");

export default WeeklyMenu;
