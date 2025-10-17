import { model, Schema } from "mongoose";
import { ShoppingListStructure } from "../types.js";

const shoppingListSchema = new Schema<ShoppingListStructure>({
  items: [
    {
      name: { type: String, required: true },
      category: { type: String, default: "otros" },
      purchasedAt: { type: Boolean, default: false },
      createdAt: { type: Date, defauult: Date.now },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

const ShoppingList = model("ShoppingList", shoppingListSchema, "shoppinglists");

export default ShoppingList;
