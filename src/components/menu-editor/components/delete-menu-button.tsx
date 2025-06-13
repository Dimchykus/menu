"use client";

import { EditButton } from "./action-button";
import { handleDeleteMenu } from "./actions";

interface Props {
  id: number;
}

const DeleteMenuButton = ({ id }: Props) => {
  return (
    <EditButton
      delete
      onClick={() => {
        handleDeleteMenu(id);
      }}
    />
  );
};

export default DeleteMenuButton;
