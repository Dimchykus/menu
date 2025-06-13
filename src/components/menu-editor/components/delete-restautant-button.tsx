"use client";

import { EditButton } from "./action-button";
import { handleDeleteRestaurant } from "./actions";

interface Props {
  id: number;
}

const DeleteRestaurantButton = ({ id }: Props) => {
  return (
    <EditButton
      delete
      onClick={() => {
        handleDeleteRestaurant(id);
      }}
    />
  );
};

export default DeleteRestaurantButton;
