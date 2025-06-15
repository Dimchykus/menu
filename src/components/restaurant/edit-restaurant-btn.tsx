"use client";

import { useModal } from "@/lib/hooks/use-modals";
import { Button } from "../ui/button";

interface Props {
  id: number;
}

const EditRestaurantBtn: React.FC<Props> = ({ id }) => {
  const { openModal } = useModal();

  return (
    <Button
      onClick={() => {
        openModal("restaurantForm", { id });
      }}
    >
      Edit restaurant
    </Button>
  );
};

export default EditRestaurantBtn;
