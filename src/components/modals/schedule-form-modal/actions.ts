"use server";

import { createSchedule } from "@/lib/db/actions/menu";
import { type ScheduleFormValues } from ".";
import { InsertSchedule } from "@/lib/db/schema/menu";
import { revalidatePath } from "next/cache";

export const handleCreateSchedule = async (
  data: ScheduleFormValues,
  restaurantId: number,
) => {
  try {
    const newSchedule: InsertSchedule[] = Object.entries(data).map(
      ([day, schedule]) => ({
        restaurantId,
        dayOfWeek: day as InsertSchedule["dayOfWeek"],
        open: schedule.start,
        close: schedule.close,
      }),
    );

    await createSchedule(newSchedule);

    revalidatePath(`/restaurant/${restaurantId}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error creating schedule", error);

    return {
      success: false,
      error: "Failed to create schedule",
    };
  }
};
