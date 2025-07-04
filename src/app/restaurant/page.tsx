import { getRestaurants } from "@/lib/db/actions/menu";

export default async function Page() {
  const restaurants = await getRestaurants();

  if (!restaurants) {
    return <div>Error loading restaurants</div>;
  }

  return <div>restaurant</div>;
}
