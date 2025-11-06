import {
  NewMealBodyResponse,
  NewMealRequestBody,
} from "../controller/types.js";

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
