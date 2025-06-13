import { getCategoryDishes } from "@/lib/db/actions/menu";
import MenuDish from "./menu-dish";

interface Props {
  categoryId: number;
}

const MenuDishes = async ({ categoryId }: Props) => {
  const dishes = await getCategoryDishes(categoryId);

  return (
    <div className="p-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {dishes.map((dish) => (
        <MenuDish key={dish.id} dish={dish} />
      ))}
    </div>
  );
};

export default MenuDishes;
