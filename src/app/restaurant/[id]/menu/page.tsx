import RestaurantMenu from "@/components/restaurant-menu";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const restaurantId = parseInt(params.id);

  return (
    <div className="flex-1 flex">
      <RestaurantMenu restaurantId={restaurantId} />
    </div>
  );
}
