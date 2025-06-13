import { getRestaurantById, getRestaurantMenu } from "@/lib/db/actions/menu";
import { redirect } from "next/navigation";
import Link from "next/link";

// Array of modern gradient combinations
const gradients = [
  "from-purple-500/20 to-pink-500/20",
  "from-blue-500/20 to-teal-500/20",
  "from-indigo-500/20 to-cyan-500/20",
  "from-fuchsia-500/20 to-orange-500/20",
  "from-rose-500/20 to-yellow-500/20",
  "from-violet-500/20 to-emerald-500/20",
  "from-sky-500/20 to-amber-500/20",
];

interface Props {
  restaurantId: number;
}

const RestaurantMenu: React.FC<Props> = async ({ restaurantId }) => {
  const menu = await getRestaurantMenu(restaurantId);
  const restaurant = await getRestaurantById(restaurantId);

  if (!menu || menu.length === 0) {
    redirect(`/restaurant/${restaurantId}`);
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-7xl mb-12 text-center">
        <h1 className="text-5xl font-bold mb-2 bg-clip-text">
          {restaurant?.name}
        </h1>
      </div>
      <div className="flex flex-wrap gap-8 w-full max-w-7xl place-items-center justify-items-center justify-center">
        {menu.map((item, index) => {
          const gradientIndex = index % gradients.length;
          const gradient = gradients[gradientIndex];

          return (
            <div
              key={item.id}
              className={`
                group
                bg-black rounded-3xl p-8 text-white 
                relative overflow-hidden border border-white/10 
                flex flex-col gap-6
                bg-gradient-to-br ${gradient}
                backdrop-blur-3xl
                transition-all duration-300 ease-out
                hover:scale-[1.02] hover:shadow-xl hover:shadow-white/10
                w-full max-w-sm
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/20 opacity-60" />

              <div className="relative z-10">
                <h2 className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  {item.name}
                </h2>

                {item.description && (
                  <p className="text-base text-gray-300 leading-relaxed mt-3">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="relative z-10 mt-auto">
                <div className="text-2xl font-medium mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/10">
                  Features
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-2 text-gray-300 group-hover:text-white/90 transition-colors">
                    <span className="text-white">✓</span> Fresh ingredients
                  </li>
                  <li className="flex items-center gap-2 text-gray-300 group-hover:text-white/90 transition-colors">
                    <span className="text-white">✓</span> Made to order
                  </li>
                  <li className="flex items-center gap-2 text-gray-300 group-hover:text-white/90 transition-colors">
                    <span className="text-white">✓</span> Local specialties
                  </li>
                </ul>
              </div>

              <Link
                href={`/restaurant/${restaurantId}/menu/${item.id}`}
                className="
                  relative z-10 mt-6 
                  bg-white/10 text-white 
                  rounded-xl py-4 px-6 
                  text-base font-semibold 
                  cursor-pointer 
                  backdrop-blur-sm
                  transition-all duration-300
                  border border-white/20
                  hover:bg-white hover:text-black
                  hover:scale-105 hover:shadow-lg hover:shadow-white/20
                  text-center
                "
              >
                View Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
