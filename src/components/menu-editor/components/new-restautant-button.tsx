"use client";

import { useModal } from "@/hooks/modals";
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
      Add Restaurant
    </Button>
  );
};

export default AddRestaurantButton;
