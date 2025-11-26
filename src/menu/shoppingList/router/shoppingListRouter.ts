import { Router } from "express";
import ShoppingListController from "../controller/ShoppingListController.js";
import ShoppingList from "../model/shoppingList.js";
import { verifyToken } from "../../../auth/middleware/verifyToken.js";

const shoppingListRouter = Router();

const shoppingListController = new ShoppingListController(ShoppingList);

shoppingListRouter.get(
  "/",
  verifyToken,
  shoppingListController.getShoppingList,
);

shoppingListRouter.post("/", shoppingListController.addIngredient);

shoppingListRouter.patch(
  "/ingredients/:ingredientId",
  shoppingListController.toggleIngredientPurchasedStatus,
);

shoppingListRouter.delete(
  "/ingredients/:ingredientId",
  shoppingListController.deleteIngredient,
);

export default shoppingListRouter;
