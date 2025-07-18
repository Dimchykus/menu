"use server";

import Restaurants from "@/components/restaurants";
import { getRestaurants } from "@/lib/db/actions/menu";

export default async function Page() {
  const restaurants = await getRestaurants();

  if (!restaurants) {
    return <div>No restaurants</div>;
  }

  return <Restaurants restaurants={restaurants} />;
}
