"use client";

import { createContext, useState, ReactNode } from "react";

export interface ModalPropsMap {
  restaurantForm?: { id?: number };
  menuForm?: { id?: number; restaurantId?: number };
  categoryForm?: { id?: number; menuId?: number };
  dishForm?: { id?: number; categoryId?: number };
  scheduleForm?: { id: number };
  dishOrder?: boolean;
  dishAiCalories?: { dishId?: number };
}

type ModalKey = keyof ModalPropsMap;

interface ModalContextType {
  modals: ModalPropsMap;
  openModal: <T extends ModalKey>(
    type: T,
    props: Exclude<ModalPropsMap[T], null>,
  ) => void;
  closeModal: <T extends ModalKey>(type: T) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

const initialModalState: ModalPropsMap = {};

export const ModalProvider = ({
  children,
  defaultValues,
}: {
  children: ReactNode;
  defaultValues?: ModalPropsMap;
}) => {
  const [modals, setModals] = useState<ModalPropsMap>(
    defaultValues || initialModalState,
  );

  const openModal = <T extends ModalKey>(
    type: T,
    props: Exclude<ModalPropsMap[T], null>,
  ) => {
    setModals((prev) => ({ ...prev, [type]: props }));
  };

  const closeModal = <T extends ModalKey>(type: T) => {
    setModals((prev) => ({ ...prev, [type]: null }));
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
