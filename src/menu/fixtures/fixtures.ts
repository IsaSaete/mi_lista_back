import { IngredientStructure } from "../types.js";

export const tomate: IngredientStructure = {
  _id: "1",
  name: "Tomate",
  category: "Verdura",
  purchasedAt: false,
  createdAt: new Date("2025-10-01T10:00:00Z"),
};

export const aceiteOliva: IngredientStructure = {
  _id: "2",
  name: "Aceite de oliva virgen extra",
  category: "Aceite",
  purchasedAt: false,
  createdAt: new Date("2025-10-02T12:15:00Z"),
};

export const espagueti: IngredientStructure = {
  _id: "3",
  name: "Pasta espagueti",
  category: "Cereal",
  purchasedAt: false,
  createdAt: new Date("2025-10-03T09:30:00Z"),
};

export const albahaca: IngredientStructure = {
  _id: "4",
  name: "Albahaca fresca",
  category: "Hierba aromática",
  purchasedAt: false,
  createdAt: new Date("2025-10-05T08:45:00Z"),
};

export const parmesano: IngredientStructure = {
  _id: "5",
  name: "Queso parmesano",
  category: "Lácteo",
  purchasedAt: false,
  createdAt: new Date("2025-10-06T17:20:00Z"),
};

export const shoppingListFixtures: IngredientStructure[] = [
  tomate,
  aceiteOliva,
  albahaca,
  espagueti,
  parmesano,
];
