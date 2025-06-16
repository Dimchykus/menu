"use client";

import { Button } from "../ui/button";
import { useModal } from "@/lib/hooks/use-modals";
import { Settings } from "lucide-react";

export const OrderDishesButton = () => {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal("dishOrder", true);
  };

  return (
    <Button onClick={handleClick} className="w-full" variant="outline">
      <Settings className="w-4 h-4 mr-2" />
      Order Dishes
    </Button>
  );
};
