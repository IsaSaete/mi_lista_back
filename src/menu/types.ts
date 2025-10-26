export interface IngredientStructure {
  _id: string;
  name: string;
  category: string;
  purchasedAt: boolean;
  createdAt: Date;
}

export interface ShoppingListStructure {
  _id: string;
  ingredients: IngredientStructure[];
  updatedAt: Date;
}

export type IngredientDto = Omit<IngredientStructure, "_id">;

export type GetShoppingListResponseBody = {
  shoppingList: ShoppingListStructure;
};

export type IngredientData = Omit<IngredientStructure, "_id">;
