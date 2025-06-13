import { RestaurantMenuWithCategories } from "@/lib/db/actions/menu";
import MenuDishes from "./menu-dishes";

interface Props {
  menu: RestaurantMenuWithCategories;
  restaurantId: number;
  selectedMenu?: number;
}

const MenuCategoryDishes = async ({ menu, selectedMenu }: Props) => {
  const selectedMenuData = menu.find((m) => m.id == selectedMenu);

  if (!selectedMenuData) {
    return null;
  }

  return (
    <div>
      {selectedMenuData.categories.map((category) => (
        <div key={category.id} id={`category-${category.id}`}>
          <div className="text-2xl text-center font-semibold text-gray-800 mb-4 border-b py-2 scroll-mt-32">
            {category.name}
          </div>
          <MenuDishes categoryId={category.id} />
        </div>
      ))}
    </div>
  );
};

export default MenuCategoryDishes;
