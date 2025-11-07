import { Router } from "express";
import WeeklyMenuController from "../controller/WeeklyMenuController.js";
import WeeklyMenu from "../model/weeklyMenu.js";

const weeklyMenuRouter = Router();

const weeklyMenuController = new WeeklyMenuController(WeeklyMenu);

weeklyMenuRouter.post("/", weeklyMenuController.addNewMeal);

weeklyMenuRouter.get("/", weeklyMenuController.getWeeklyMenu);

export default weeklyMenuRouter;
