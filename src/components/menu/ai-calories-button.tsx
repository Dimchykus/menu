"use client";

import { useModal } from "@/lib/hooks/use-modals";
import { Sparkles } from "lucide-react";

interface Props {
  dishId: number;
}

const AiCaloriesButton = ({ dishId }: Props) => {
  const { openModal } = useModal();

  const handleOpenAiCaloriesModal = () => {
    openModal("dishAiCalories", { dishId });
  };

  return (
    <button
      onClick={handleOpenAiCaloriesModal}
      className="cursor-pointer absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:from-purple-600 hover:to-pink-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-white"
      title="Calculate AI Calories"
      aria-label="Calculate dish calories using AI"
    >
      <Sparkles className="h-5 w-5 animate-pulse" />
    </button>
  );
};

export default AiCaloriesButton;
