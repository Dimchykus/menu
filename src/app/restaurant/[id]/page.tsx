import Restaurant from "@/components/restaurant";
import {
  getRestaurantById,
  getRestaurantMenu,
  getSchedule,
} from "@/lib/db/actions/menu";
import { redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const restaurantId = parseInt(params.id);

  const restaurant = await getRestaurantById(restaurantId);
  const schedule = await getSchedule(restaurantId);
  const menus = await getRestaurantMenu(restaurantId);

  console.log("-----restaurant", restaurant);

  if (!restaurant) {
    redirect("/restaurants");

    return;
  }

  return (
    <div className="p-6">
      <Restaurant restaurant={restaurant} schedule={schedule} menus={menus} />
    </div>
  );
}
