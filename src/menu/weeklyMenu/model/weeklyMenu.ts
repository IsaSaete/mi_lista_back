import { model, Schema } from "mongoose";
import {
  DayMenuStructure,
  MealStructure,
  WeeklyMenuStructure,
} from "../types.js";

const mealSchema = new Schema<MealStructure>(
  {
    firstPlate: { type: String, required: true },
    secondPlate: { type: String },
    dessert: { type: String },
  },
  { _id: false },
);

const dayMenuSchema = new Schema<DayMenuStructure>(
  {
    lunch: { type: mealSchema },
    dinner: { type: mealSchema },
  },
  { _id: false },
);

const weeklyMenuSchema = new Schema<WeeklyMenuStructure>(
  {
    weeklyMenu: {
      L: { type: dayMenuSchema, default: {} },
      M: { type: dayMenuSchema, default: {} },
      X: { type: dayMenuSchema, default: {} },
      J: { type: dayMenuSchema, default: {} },
      V: { type: dayMenuSchema, default: {} },
      S: { type: dayMenuSchema, default: {} },
      D: { type: dayMenuSchema, default: {} },
    },
  },
  { timestamps: true },
);

const WeeklyMenu = model("WeeklyMenu", weeklyMenuSchema, "weeklymenu");

export default WeeklyMenu;
