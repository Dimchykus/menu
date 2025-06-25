"use client";

import { useModal } from "@/lib/hooks/use-modals";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface Props {
  restaurantId: number;
}

const AddMenuButton = ({ restaurantId }: Props) => {
  const { openModal } = useModal();

  return (
    <Button
      size="sm"
      className="gap-2"
      onClick={() => {
        openModal("menuForm", { restaurantId });
      }}
    >
      <PlusCircle className="w-4 h-4" />
      <span className="hidden sm:inline">Add Menu</span>
    </Button>
  );
};

export default AddMenuButton;
