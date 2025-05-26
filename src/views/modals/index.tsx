"use client";

import RestaurantFormModal from "@/components/modals/restaurant-form-modal";
import { useModal } from "@/hooks/modals";

const ModalContainer = () => {
  const { modals } = useModal();

  return <>{modals.restaurantForm && <RestaurantFormModal />}</>;
};

export default ModalContainer;
