"use client";

import dynamic from "next/dynamic";
import { useModal } from "@/lib/hooks/use-modals";
import { Suspense } from "react";

const MenuFormModal = dynamic(
  () => import("@/components/modals/menu-form-modal"),
);
const RestaurantFormModal = dynamic(
  () => import("@/components/modals/restaurant-form-modal"),
);
const ScheduleFormModal = dynamic(
  () => import("@/components/modals/schedule-form-modal"),
);
const CategoryFormModal = dynamic(
  () => import("@/components/modals/category-form-modal"),
);
const DishFormModal = dynamic(
  () => import("@/components/modals/dish-form-modal"),
);
const DishOrderModal = dynamic(
  () => import("@/components/modals/dish-order-modal"),
);

const ModalContainer = () => {
  const { modals } = useModal();

  return (
    <Suspense>
      {modals.restaurantForm && (
        <RestaurantFormModal {...modals.restaurantForm} />
      )}
      {modals.scheduleForm && <ScheduleFormModal {...modals.scheduleForm} />}
      {modals.menuForm && <MenuFormModal {...modals.menuForm} />}
      {modals.categoryForm && <CategoryFormModal {...modals.categoryForm} />}
      {modals.dishForm && <DishFormModal {...modals.dishForm} />}
      {modals.dishOrder && <DishOrderModal />}
    </Suspense>
  );
};

export default ModalContainer;
