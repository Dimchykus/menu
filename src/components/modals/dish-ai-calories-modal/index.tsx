"use client";

import { Button } from "@/components/ui/button";
import { ModalPropsMap } from "@/context/modals";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/lib/hooks/use-modals";
import { X, Sparkles, Zap, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  calculateDishCaloriesAction,
  CaloriesCalculationResult,
} from "./actions";

const DishAiCaloriesModal: React.FC<ModalPropsMap["dishAiCalories"]> = (
  props,
) => {
  const { closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CaloriesCalculationResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const dishId = props?.dishId;

  const handleClose = () => {
    closeModal("dishAiCalories");
  };

  const handleCalculateCalories = async () => {
    if (!dishId) return;

    setIsLoading(true);
    try {
      const calculationResult = await calculateDishCaloriesAction(dishId);
      setResult(calculationResult);
      setHasCalculated(true);
    } catch (error) {
      console.error("Error calculating calories:", error);
      setResult({
        success: false,
        error: "Failed to calculate calories. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
          <Sparkles className="w-8 h-8 text-white animate-spin" />
        </div>
        <div className="absolute -inset-2 rounded-full border-2 border-purple-300 animate-ping"></div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">
          AI is analyzing your dish...
        </h3>
        <p className="text-sm text-gray-600">
          Calculating nutritional information
        </p>
      </div>
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );

  const InitialState = () => (
    <div className="text-center py-8 space-y-6">
      <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
        <Sparkles className="w-10 h-10 text-white" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-800">
          AI Nutritional Analysis
        </h3>
        <p className="text-gray-600 max-w-sm mx-auto">
          Get instant calorie estimates and nutritional insights powered by
          artificial intelligence
        </p>
      </div>
      <Button
        onClick={handleCalculateCalories}
        disabled={!dishId}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-2 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
      >
        <Zap className="w-4 h-4 mr-2" />
        Calculate Calories
      </Button>
    </div>
  );

  const ResultsState = () => {
    if (!result) return null;

    if (!result.success) {
      return (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-red-600">
              Calculation Failed
            </h3>
            <p className="text-sm text-gray-600">{result.error}</p>
          </div>
          <Button
            onClick={handleCalculateCalories}
            variant="outline"
            className="border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            Try Again
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              Calorie Analysis
            </h3>
          </div>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {result.calories}
            </p>
          </div>
        </div>

        {/* {result.nutritionAdvice && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Healthy Tips</h3>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {result.nutritionAdvice}
              </p>
            </div>
          </div>
        )} */}

        <div className="flex space-x-3">
          <Button
            onClick={handleCalculateCalories}
            variant="outline"
            className="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Recalculate
          </Button>
          <Button
            onClick={handleClose}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            Done
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={true} onOpenChange={handleClose} data-testid="modal">
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto [&>button:first-of-type]:hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Nutrition Assistant
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Get instant calorie estimates and healthy recommendations for your
            dishes
          </DialogDescription>
          <DialogClose asChild data-testid="close-modal" onClick={handleClose}>
            <Button className="absolute right-4 top-4 size-6 p-0">
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="py-4">
          {isLoading ? (
            <LoadingState />
          ) : hasCalculated ? (
            <ResultsState />
          ) : (
            <InitialState />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DishAiCaloriesModal;
