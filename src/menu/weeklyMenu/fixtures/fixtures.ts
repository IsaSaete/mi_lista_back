import {
  NewMealBodyResponse,
  NewMealRequestBody,
} from "../controller/types.js";
import { DayMenuStructure, WeeklyMenuStructure } from "../types.js";

export const tuesdayLunchRequest: NewMealRequestBody = {
  day: "M",
  mealType: "lunch",
  mealData: {
    firstPlate: "Patatas a la riojana",
    secondPlate: "Ensalada verde",
  },
};

export const tuesdayLunchResponse: NewMealBodyResponse = {
  weeklyMenu: {
    M: {
      lunch: {
        firstPlate: "Patatas a la riojana",
        secondPlate: "Ensalada verde",
      },
    },
  },
};

export const tuesday: DayMenuStructure = {
  lunch: {
    firstPlate: "Ensalada de quinoa y tomates cherry",
    dessert: "Naranja",
  },
  dinner: { firstPlate: "Tortilla de patata y calabacín" },
};

export const monday: DayMenuStructure = {
  lunch: {
    firstPlate: "Ensalada verde",
    secondPlate: "Costillas al horno con boniato",
  },
};

export const weeklyMenu: WeeklyMenuStructure = {
  _id: "123456789acbdef123456789",
  weeklyMenu: {
    L: {
      lunch: {
        firstPlate: "Ensalada verde",
        secondPlate: "Costillas al horno con boniato",
      },
    },
    M: {
      lunch: {
        firstPlate: "Ensalada de quinoa y tomates cherry",
        dessert: "Naranja",
      },
      dinner: {
        firstPlate: "Tortilla de patata y calabacín",
      },
    },
    X: { lunch: {}, dinner: {} },
    J: { lunch: {}, dinner: {} },
    V: { lunch: {}, dinner: {} },
    S: { lunch: {}, dinner: {} },
    D: { lunch: {}, dinner: {} },
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const weeklyMenuEmpty: WeeklyMenuStructure = {
  _id: "123456789acbdef123456780",
  weeklyMenu: {
    L: { lunch: {}, dinner: {} },
    M: { lunch: {}, dinner: {} },
    X: { lunch: {}, dinner: {} },
    J: { lunch: {}, dinner: {} },
    V: { lunch: {}, dinner: {} },
    S: { lunch: {}, dinner: {} },
    D: { lunch: {}, dinner: {} },
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};
