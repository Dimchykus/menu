"use server";

import { calculateDishCalories as getAICalories } from "@/lib/openai";
import { getDishById } from "@/lib/db/actions/menu";

export interface CaloriesCalculationResult {
  success: boolean;
  calories?: string;
  nutritionAdvice?: string;
  error?: string;
}

export const calculateDishCaloriesAction = async (
  dishId: number,
): Promise<CaloriesCalculationResult> => {
  try {
    const dish = await getDishById(dishId);

    if (!dish) {
      return {
        success: false,
        error: "Dish not found",
      };
    }

    const [calories] = await Promise.all([
      getAICalories(dish.name, dish.description || undefined),
      // getDishNutritionAdvice(dish.name, dish.description || undefined),
    ]);

    return {
      success: true,
      calories,
      // nutritionAdvice,
    };
  } catch (error) {
    console.error("Error calculating dish calories:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};
