"use client";

import { useModal } from "@/lib/hooks/use-modals";
import { EditButton } from "./action-button";

interface Props {
  id: number;
  menuId: number;
}

const EditCategoryButton = ({ id, menuId }: Props) => {
  const { openModal } = useModal();

  return (
    <EditButton
      onClick={() => {
        openModal("categoryForm", { id, menuId });
      }}
    />
  );
};

export default EditCategoryButton;
