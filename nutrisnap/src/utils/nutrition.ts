// 생성일시: 2026-05-19

import { FoodItem, Meal } from '../types';

export interface NutritionSummary {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

export function sumFoods(foods: FoodItem[]): NutritionSummary {
  return foods.reduce(
    (acc, f) => ({
      calories: acc.calories + f.calories,
      carbs: acc.carbs + f.carbs,
      protein: acc.protein + f.protein,
      fat: acc.fat + f.fat,
    }),
    { calories: 0, carbs: 0, protein: 0, fat: 0 }
  );
}

export function sumMeals(meals: Meal[]): NutritionSummary {
  return sumFoods(meals.flatMap((m) => m.foods));
}

export function today(): string {
  return new Date().toISOString().split('T')[0];
}

export function formatDate(date: string): string {
  const d = new Date(date);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}
