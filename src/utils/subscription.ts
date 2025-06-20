import { SubscriptionType } from "@/lib/db/schema/subscription";

export const calculateSubscriptionEndDate = (
  duration: SubscriptionType["duration"],
) => {
  const endDate = new Date();

  switch (duration) {
    case "day":
      endDate.setDate(endDate.getDate() + 1);
      break;
    case "week":
      endDate.setDate(endDate.getDate() + 7);
      break;
    case "month":
      endDate.setMonth(endDate.getMonth() + 1);
      break;
    case "year":
      endDate.setFullYear(endDate.getFullYear() + 1);
      break;
    default:
      return null;
  }

  return endDate;
};
