"use client";

import { EditButton } from "./action-button";
import { handleDeleteDish } from "./actions";

interface Props {
  id: number;
}

const DeleteDishButton = ({ id }: Props) => {
  return (
    <EditButton
      delete
      onClick={() => {
        handleDeleteDish(id);
      }}
    />
  );
};

export default DeleteDishButton;
