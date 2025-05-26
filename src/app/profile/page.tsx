"use client";

import { useModal } from "@/hooks/modals";

export default function Page() {
  const { openModal } = useModal();

  return (
    <div>
      <button
        onClick={() => {
          openModal("restaurantForm", true);
        }}
      >Open popup</button>
    </div>
  );
}
