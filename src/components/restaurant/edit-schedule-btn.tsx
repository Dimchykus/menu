"use client";

import { useModal } from "@/lib/hooks/use-modals";
import { Button } from "../ui/button";

interface Props {
  id: number;
}

const EditScheduleBtn: React.FC<Props> = ({ id }) => {
  const { openModal } = useModal();

  return (
    <Button
      onClick={() => {
        openModal("scheduleForm", { id });
      }}
      className="flex-1"
    >
      Edit schedule
    </Button>
  );
};

export default EditScheduleBtn;
