import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { getUserEditDishes } from "@/lib/db/actions/menu";

interface Props {
  categoryId: number;
}

const EditDishes = async ({ categoryId }: Props) => {
  const dishes = await getUserEditDishes(categoryId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Dishes</h3>
        <Button size="sm" className="gap-2">
          <PlusCircle className="w-4 h-4" />
          Add Dish
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dishes?.map((dish) => (
          <div
            key={dish.id}
            className="group relative overflow-hidden rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg border"
          >
            {dish.image && (
              <div className="relative mb-3 h-48 w-full overflow-hidden rounded-lg">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            )}
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              {dish.name}
            </h3>
            {dish.description && (
              <p className="mb-3 text-sm text-gray-600">{dish.description}</p>
            )}
            <div className="flex items-center justify-between">
              {dish.price && (
                <span className="text-lg font-bold text-green-600">
                  ${(dish.price / 100).toFixed(2)}
                </span>
              )}
              {dish.weight && (
                <span className="text-sm text-gray-500">
                  {dish.weight}
                  {dish.weight_type || "g"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditDishes;
