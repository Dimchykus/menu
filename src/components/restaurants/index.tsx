import { Restaurant } from "@/lib/db/schema/menu";
import Image from "next/image";
import Link from "next/link";

interface Props {
  restaurants: Restaurant[];
}

const Restaurants: React.FC<Props> = ({ restaurants }) => {
  return (
    <div className="p-6 flex flex-col gap-4 max-w-[50%]">
      <h1 className="text-2xl font-bold mb-4">Restaurants</h1>
      {restaurants.map((restaurant) => (
        <Link
          key={restaurant.id}
          href={`/restaurant/${restaurant.id}`}
          className="p-4 mb-4 bg-white rounded shadow hover:bg-gray-50 flex items-center gap-4 transition-colors duration-200"
        >
          <Image
            width={200}
            height={200}
            src={
              "https://www.lakelawnresort.com/wp-content/uploads/2016/05/LakeLawnResort_1878bar-1900x855-c-default.jpg"
            }
            alt={restaurant.name}
            className="h-32 object-cover rounded mb-2"
          />
          <div className="flex self-start flex-col flex-1">
            <h2 className="text-xl font-semibold">{restaurant.name}</h2>
            <p className="text-gray-600">{restaurant.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Restaurants;
