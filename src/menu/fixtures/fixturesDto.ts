import { IngredientData, IngredientDto } from "../types.js";

export const tomateDto: IngredientDto = {
  name: "Tomate",
  category: "Verdura",
  purchasedAt: false,
  createdAt: new Date("2025-10-01T10:00:00Z"),
};

export const aceiteOlivaDto: IngredientDto = {
  name: "Aceite de oliva virgen extra",
  category: "Aceite",
  purchasedAt: false,
  createdAt: new Date("2025-10-02T12:15:00Z"),
};

export const alcachofa: IngredientData = {
  name: "Alcachofas",
  category: "otros",
  purchasedAt: false,
  createdAt: new Date("2025-10-25T12:15:00Z"),
};
