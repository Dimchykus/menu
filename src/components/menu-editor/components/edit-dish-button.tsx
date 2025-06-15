"use client";

import { useModal } from "@/lib/hooks/use-modals";
import { EditButton } from "./action-button";
import { Dish } from "@/lib/db/schema/menu";

interface Props {
  id: number;
  categoryId: number;
  data: Dish;
}

const EditDishButton = ({ id, categoryId, data }: Props) => {
  const { openModal } = useModal();

  return (
    <EditButton
      onClick={() => {
        openModal("dishForm", { id, categoryId, data });
      }}
    />
  );
};

export default EditDishButton;
