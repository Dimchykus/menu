"use client";

import { useModal } from "@/lib/hooks/use-modals";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface Props {
  menuId: number;
}

const AddCategoryButton = ({ menuId }: Props) => {
  const { openModal } = useModal();

  return (
    <Button
      size="sm"
      className="gap-2"
      onClick={() => {
        openModal("categoryForm", { menuId });
      }}
    >
      <PlusCircle className="w-4 h-4" />
      Add Category
    </Button>
  );
};

export default AddCategoryButton;
