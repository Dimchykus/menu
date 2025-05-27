import { type Restaurant as RestaurantI } from "@/lib/db/schema/menu";
import Image from "next/image";

interface Props {
  restaurant: RestaurantI;
}

const Restaurant: React.FC<Props> = ({ restaurant }) => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <Image
        width={400}
        height={400}
        src={
          "https://www.lakelawnresort.com/wp-content/uploads/2016/05/LakeLawnResort_1878bar-1900x855-c-default.jpg"
        }
        alt={restaurant.name}
        className="h-32 object-cover rounded mb-2"
      />
      <div>
        <h1 className="text-2xl font-bold mb-4">{restaurant.name}</h1>
        <p className="text-gray-600 mb-4">{restaurant.description}</p>
        <p className="text-gray-800">Address: {restaurant.address}</p>
        <p className="text-gray-800">Phone: {restaurant.phone}</p>
      </div>
    </div>
  );
};

export default Restaurant;
