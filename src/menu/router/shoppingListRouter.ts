import { Router } from "express";
import ShoppingListController from "../controller/ShoppingListController.js";
import ShoppingList from "../model/shoppingList.js";

const shoppingListRouter = Router();

const shoppingListController = new ShoppingListController(ShoppingList);

shoppingListRouter.get("/", shoppingListController.getShoppingList);

export default shoppingListRouter;
