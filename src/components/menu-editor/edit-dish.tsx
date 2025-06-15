import { getUserEditDishes } from "@/lib/db/actions/menu";
import EditDishButton from "./components/edit-dish-button";
import DeleteDishButton from "./components/delete-dish-button";
import AddDishButton from "./components/new-dish-button";
import Image from "next/image";

interface Props {
  categoryId: number;
}

const EditDishes = async ({ categoryId }: Props) => {
  const dishes = await getUserEditDishes(categoryId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Dishes</h3>
        <AddDishButton categoryId={categoryId} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dishes?.map((dish) => (
          <div
            key={dish.id}
            className="group relative overflow-hidden rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg border"
          >
            <div className="absolute right-2 top-2 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <EditDishButton
                id={dish.id}
                categoryId={categoryId}
                data={dish}
              />
              <DeleteDishButton id={dish.id} />
            </div>

            <div className="relative mb-3 h-48 w-full overflow-hidden rounded-lg">
              <Image
                src={
                  dish.image ||
                  "https://www.lakelawnresort.com/wp-content/uploads/2016/05/LakeLawnResort_1878bar-1900x855-c-default.jpg"
                }
                alt={dish.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                width={200}
                height={200}
              />
            </div>

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
