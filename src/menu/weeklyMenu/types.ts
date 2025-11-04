export type DayOfWeek = "L" | "M" | "X" | "J" | "V" | "S" | "D";
export interface MealStructure {
  firstPlate: string;
  secondPlate?: string;
  dessert?: string;
}

export interface DayMenuStructure {
  lunch?: MealStructure;
  dinner?: MealStructure;
}

export type WeeklyMenuData = Record<DayOfWeek, DayMenuStructure>;

export interface WeeklyMenuStructure {
  _id: string;
  weeklyMenu: WeeklyMenuData;
  createdAt: Date;
  updatedAt: Date;
}

export type NewMealData = Partial<WeeklyMenuData>;
