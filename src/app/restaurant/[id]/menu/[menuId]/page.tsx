import Menu from "@/components/menu";
import MenuNavigation from "@/components/menu-navigation";
import {
  getRestaurantById,
  getRestaurantMenusWithCategories,
} from "@/lib/db/actions/menu";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ id: string; menuId: string }>;
  searchParams: Promise<{ category: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const restaurantId = parseInt(params.id, 10);
  const menuId = parseInt(params.menuId, 10);

  const restaurant = await getRestaurantById(restaurantId);
  const menu = await getRestaurantMenusWithCategories(restaurantId);

  if (!restaurant || !menu) {
    notFound();
  }

  return (
    <div className="flex-1 flex">
      <MenuNavigation
        restaurant={restaurant}
        menu={menu}
        selectedMenu={menuId}
      />
      <Menu
        selectedMenu={menuId}
        selectedCategory={parseInt(searchParams.category, 10)}
        restaurant={restaurant}
        menu={menu}
      />
    </div>
  );
}
