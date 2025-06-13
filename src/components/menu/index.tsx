import { RestaurantMenuWithCategories } from "@/lib/db/actions/menu";
import { type Restaurant } from "@/lib/db/schema/menu";
import MenuList from "./menu-list";
import MenuCategories from "./menu-categories";
import MenuCategoryDishes from "./menu-category-dishes";

interface Props {
  selectedMenu: number;
  selectedCategory: number;
  restaurant: Restaurant;
  menu: RestaurantMenuWithCategories;
}

const Menu = ({ selectedMenu, restaurant, menu }: Props) => {
  return (
    <div className="flex-1 flex flex-col">
      <MenuList
        menu={menu}
        restaurantId={restaurant.id}
        selectedMenu={selectedMenu}
      />
      <MenuCategories
        menu={menu}
        restaurantId={restaurant.id}
        selectedMenu={selectedMenu}
      />
      <MenuCategoryDishes
        menu={menu}
        restaurantId={restaurant.id}
        selectedMenu={selectedMenu}
      />
    </div>
  );
};

export default Menu;
