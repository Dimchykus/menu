"use client";

import MenuFormModal from "@/components/modals/menu-form-modal";
import RestaurantFormModal from "@/components/modals/restaurant-form-modal";
import ScheduleFormModal from "@/components/modals/schedule-form-modal";
import { useModal } from "@/hooks/modals";

const ModalContainer = () => {
  const { modals } = useModal();

  return (
    <>
      {modals.restaurantForm && (
        <RestaurantFormModal {...modals.restaurantForm} />
      )}
      {modals.scheduleForm && <ScheduleFormModal {...modals.scheduleForm} />}
      {modals.menuForm && <MenuFormModal {...modals.menuForm} />}
    </>
  );
};

export default ModalContainer;
