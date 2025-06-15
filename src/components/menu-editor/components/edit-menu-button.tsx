"use client";

import { useModal } from "@/lib/hooks/use-modals";
import { EditButton } from "./action-button";

interface Props {
  id: number;
  restaurantId: number;
}

const EditMenuButton = ({ id, restaurantId }: Props) => {
  const { openModal } = useModal();

  return (
    <EditButton
      onClick={() => {
        openModal("menuForm", { id, restaurantId });
      }}
    />
  );
};

export default EditMenuButton;
