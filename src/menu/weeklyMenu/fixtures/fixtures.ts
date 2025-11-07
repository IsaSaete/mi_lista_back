import {
  NewMealBodyResponse,
  NewMealRequestBody,
} from "../controller/types.js";
import { DayMenuStructure, MenuDayData } from "../types.js";

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

export const weeklyMenu: MenuDayData = {
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
  },
};

export const weeklyMenuEmpty: MenuDayData = {
  weeklyMenu: {
    L: { lunch: {}, dinner: {} },
    M: { lunch: {}, dinner: {} },
    X: { lunch: {}, dinner: {} },
    J: { lunch: {}, dinner: {} },
    V: { lunch: {}, dinner: {} },
    S: { lunch: {}, dinner: {} },
    D: { lunch: {}, dinner: {} },
  },
};

export const mondayEmpty: DayMenuStructure = {
  lunch: {},
  dinner: {},
};
