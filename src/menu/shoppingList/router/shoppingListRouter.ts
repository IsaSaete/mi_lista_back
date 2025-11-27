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

shoppingListRouter.post("/", verifyToken, shoppingListController.addIngredient);

shoppingListRouter.patch(
  "/ingredients/:ingredientId",
  verifyToken,
  shoppingListController.toggleIngredientPurchasedStatus,
);

shoppingListRouter.delete(
  "/ingredients/:ingredientId",
  verifyToken,
  shoppingListController.deleteIngredient,
);

export default shoppingListRouter;
