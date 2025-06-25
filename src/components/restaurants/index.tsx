import { Restaurant } from "@/lib/db/schema/menu";
import Image from "next/image";
import Link from "next/link";

interface Props {
  restaurants: Restaurant[];
}

const Restaurants: React.FC<Props> = ({ restaurants }) => {
  return (
    <div className="p-6 flex flex-col gap-4 max-w-full w-[650px] box-border mx-auto">
      <h1 className="text-2xl font-bold mb-4">Restaurants</h1>
      {restaurants.map((restaurant) => (
        <Link
          key={restaurant.id}
          href={`/restaurant/${restaurant.id}`}
          className="p-4 mb-4 bg-white rounded shadow hover:bg-gray-50 flex flex-col items-center gap-4 transition-colors duration-200 sm:flex-row"
        >
          <Image
            width={256}
            height={128}
            src={
              "https://www.lakelawnresort.com/wp-content/uploads/2016/05/LakeLawnResort_1878bar-1900x855-c-default.jpg"
            }
            alt={restaurant.name}
            className="h-32 object-cover rounded mb-2 w-full sm:w-48"
          />
          <div className="flex flex-col justify-between w-full self-stretch">
            <div className="flex self-start flex-col flex-1 space-y-2">
              <h2 className="text-xl font-bold text-gray-800 tracking-wide hover:text-blue-600 transition-colors duration-200">
                {restaurant.name}
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm font-medium">
                {restaurant.description}
              </p>
            </div>
            <div className="mt-auto ml-auto pt-3">
              <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors duration-200">
                View Menu →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Restaurants;
