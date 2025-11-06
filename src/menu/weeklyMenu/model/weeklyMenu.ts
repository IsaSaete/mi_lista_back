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
      L: { type: dayMenuSchema, default: () => ({ lunch: {}, dinner: {} }) },
      M: { type: dayMenuSchema, default: () => ({ lunch: {}, dinner: {} }) },
      X: { type: dayMenuSchema, default: () => ({ lunch: {}, dinner: {} }) },
      J: { type: dayMenuSchema, default: () => ({ lunch: {}, dinner: {} }) },
      V: { type: dayMenuSchema, default: () => ({ lunch: {}, dinner: {} }) },
      S: { type: dayMenuSchema, default: () => ({ lunch: {}, dinner: {} }) },
      D: { type: dayMenuSchema, default: () => ({ lunch: {}, dinner: {} }) },
    },
  },
  { timestamps: true },
);

const WeeklyMenu = model("WeeklyMenu", weeklyMenuSchema, "weeklymenu");

export default WeeklyMenu;
