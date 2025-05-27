import Restaurant from "@/components/restaurant";
import { getRestaurantById } from "@/lib/db/actions/menu";
import { redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const restaurant = await getRestaurantById(params.id);

  if (!restaurant) {
    redirect("/restaurants");
  }

  return (
    <div className="p-6">
      <Restaurant restaurant={restaurant} />
    </div>
  );
}
