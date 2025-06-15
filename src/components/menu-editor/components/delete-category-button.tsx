"use client";

import { EditButton } from "./action-button";
import { handleDeleteCategory } from "./actions";

interface Props {
  id: number;
}

const DeleteCategoryButton = ({ id }: Props) => {
  return (
    <EditButton
      delete
      onClick={() => {
        handleDeleteCategory(id);
      }}
    />
  );
};

export default DeleteCategoryButton;
