'use client'

import { ModalContext } from "@/context/modals";
import { useContext } from "react";

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};
