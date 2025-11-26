import { IngredientStructure, ShoppingListStructure } from "../types.js";

export const tomate: IngredientStructure = {
  _id: "a3f9d7c2e5b8147ad09c3e1f",
  name: "Tomate",
  category: "Verdura",
  isPurchased: false,
  createdAt: new Date("2025-10-01T10:00:00Z"),
};

export const tomatePurchased: IngredientStructure = {
  _id: "a3f9d7c2e5b8147ad09c3e1f",
  name: "Tomate",
  category: "Verdura",
  isPurchased: true,
  createdAt: new Date("2025-10-01T10:00:00Z"),
};

export const aceiteOliva: IngredientStructure = {
  _id: "a3f9d7c2e5b8147ad09c3e1e",
  name: "Aceite de oliva virgen extra",
  category: "Aceite",
  isPurchased: false,
  createdAt: new Date("2025-10-02T12:15:00Z"),
};

export const espagueti: IngredientStructure = {
  _id: "a3f9d7c2e5b8147ad09c3e13",
  name: "Pasta espagueti",
  category: "Cereal",
  isPurchased: false,
  createdAt: new Date("2025-10-03T09:30:00Z"),
};

export const albahaca: IngredientStructure = {
  _id: "a3f9d7c2e5b8147ad09c3e14",
  name: "Albahaca fresca",
  category: "Hierba aromática",
  isPurchased: false,
  createdAt: new Date("2025-10-05T08:45:00Z"),
};

export const parmesano: IngredientStructure = {
  _id: "a3f9d7c2e5b8147ad09c3e15",
  name: "Queso parmesano",
  category: "Lácteo",
  isPurchased: false,
  createdAt: new Date("2025-10-06T17:20:00Z"),
};

export const shoppingListFixtures: IngredientStructure[] = [
  tomate,
  aceiteOliva,
  albahaca,
  espagueti,
  parmesano,
];

export const shoppingListUser1: ShoppingListStructure = {
  _id: "1",
  userId: "507f1f77bcf86cd799439011",
  ingredients: [tomate],
  updatedAt: new Date("2025-10-06T17:20:00Z"),
};

export const updateShoppingListUser1: ShoppingListStructure = {
  _id: "1",
  userId: "507f1f77bcf86cd799439011",
  ingredients: [tomatePurchased, aceiteOliva],
  updatedAt: new Date("2025-10-06T17:20:00Z"),
};
