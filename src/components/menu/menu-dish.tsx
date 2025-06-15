import { Dish } from "@/lib/db/schema/menu";
import Image from "next/image";

interface Props {
  dish: Dish;
}

const MenuDish = ({ dish }: Props) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg">
      {/* {dish.image && ( */}
      <div className="relative mb-3 h-48 w-full overflow-hidden rounded-lg">
        <Image
          src={
            dish.image ||
            "https://www.lakelawnresort.com/wp-content/uploads/2016/05/LakeLawnResort_1878bar-1900x855-c-default.jpg"
          }
          alt={dish.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          width={300}
          height={192}
        />
      </div>
      {/* )} */}
      <h3 className="mb-2 text-lg font-semibold text-gray-800">{dish.name}</h3>
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
  );
};

export default MenuDish;
