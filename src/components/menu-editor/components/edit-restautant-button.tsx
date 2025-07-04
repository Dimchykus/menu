"use client";

import { useModal } from "@/lib/hooks/use-modals";
import { EditButton } from "./action-button";

interface Props {
  id: number;
}

const EditRestaurantButton = ({ id }: Props) => {
  const { openModal } = useModal();

  return (
    <EditButton
      onClick={() => {
        openModal("restaurantForm", { id });
      }}
    />
  );
};

export default EditRestaurantButton;
