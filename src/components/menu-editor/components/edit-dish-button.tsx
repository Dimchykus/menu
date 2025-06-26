"use client";

import { useModal } from "@/lib/hooks/use-modals";
import { EditButton } from "./action-button";

interface Props {
  id: number;
  categoryId: number;
}

const EditDishButton = ({ id, categoryId }: Props) => {
  const { openModal } = useModal();

  return (
    <EditButton
      onClick={() => {
        openModal("dishForm", { id, categoryId });
      }}
    />
  );
};

export default EditDishButton;
