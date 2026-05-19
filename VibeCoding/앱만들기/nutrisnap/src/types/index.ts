// 생성일시: 2026-05-19

export interface FoodItem {
  name: string;
  amount: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

export interface Meal {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: FoodItem[];
  createdAt: number;
}

export type MealType = Meal['mealType'];
