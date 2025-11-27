import { Router } from "express";
import WeeklyMenuController from "../controller/WeeklyMenuController.js";
import WeeklyMenu from "../model/weeklyMenu.js";
import { verifyToken } from "../../../auth/middleware/verifyToken.js";

const weeklyMenuRouter = Router();

const weeklyMenuController = new WeeklyMenuController(WeeklyMenu);

weeklyMenuRouter.use(verifyToken);

weeklyMenuRouter.post("/", weeklyMenuController.addNewMeal);

weeklyMenuRouter.get("/", weeklyMenuController.getWeeklyMenu);

export default weeklyMenuRouter;
