import { model, Schema } from "mongoose";
import { ShoppingListStructure } from "../types.js";

const shoppingListSchema = new Schema<ShoppingListStructure>({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  ingredients: [
    {
      name: { type: String, required: true },
      category: { type: String, default: "otros" },
      isPurchased: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

const ShoppingList = model("ShoppingList", shoppingListSchema, "shoppinglists");

export default ShoppingList;
