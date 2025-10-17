export interface IngredientStructure {
  _id: string;
  name: string;
  category: string;
  purchasedAt: boolean;
  createdAt: Date;
}

export interface ShoppingListStructure {
  _id: string;
  items: IngredientStructure[];
  updatedAt: Date;
}
