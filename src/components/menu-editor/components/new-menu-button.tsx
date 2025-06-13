"use client";

import { useModal } from "@/hooks/modals";
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
      Add Menu
    </Button>
  );
};

export default AddMenuButton;
