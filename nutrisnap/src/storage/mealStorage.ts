// 생성일시: 2026-05-19

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meal } from '../types';

function keyFor(date: string) {
  return `meals_${date}`;
}

export async function getMeals(date: string): Promise<Meal[]> {
  const raw = await AsyncStorage.getItem(keyFor(date));
  return raw ? JSON.parse(raw) : [];
}

export async function saveMeal(meal: Meal): Promise<void> {
  const meals = await getMeals(meal.date);
  const updated = [...meals.filter((m) => m.id !== meal.id), meal];
  await AsyncStorage.setItem(keyFor(meal.date), JSON.stringify(updated));
}

export async function deleteMeal(date: string, id: string): Promise<void> {
  const meals = await getMeals(date);
  await AsyncStorage.setItem(keyFor(date), JSON.stringify(meals.filter((m) => m.id !== id)));
}

export async function getWeeklyMeals(startDate: string): Promise<Record<string, Meal[]>> {
  const result: Record<string, Meal[]> = {};
  const start = new Date(startDate);
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    result[dateStr] = await getMeals(dateStr);
  }
  return result;
}
