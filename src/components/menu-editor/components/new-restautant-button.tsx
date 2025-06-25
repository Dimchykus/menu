"use client";

import { useModal } from "@/lib/hooks/use-modals";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const AddRestaurantButton = () => {
  const { openModal } = useModal();

  return (
    <Button
      size="sm"
      className="gap-2"
      onClick={() => {
        openModal("restaurantForm", {});
      }}
    >
      <PlusCircle className="w-4 h-4" />
      <span className="hidden sm:inline">Add Restaurant</span>
    </Button>
  );
};

export default AddRestaurantButton;
