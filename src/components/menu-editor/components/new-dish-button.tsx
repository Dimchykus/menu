"use client";

import { useModal } from "@/lib/hooks/use-modals";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface Props {
  categoryId: number;
}

const AddDishButton = ({ categoryId }: Props) => {
  const { openModal } = useModal();

  return (
    <Button
      size="sm"
      className="gap-2"
      onClick={() => {
        openModal("dishForm", { categoryId });
      }}
    >
      <PlusCircle className="w-4 h-4" />
      Add Dish
    </Button>
  );
};

export default AddDishButton;
