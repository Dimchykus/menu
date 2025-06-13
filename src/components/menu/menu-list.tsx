import { RestaurantMenuWithCategories } from "@/lib/db/actions/menu";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Link from "next/link";

interface Props {
  menu: RestaurantMenuWithCategories;
  restaurantId: number;
  selectedMenu?: number;
}

const MenuList = ({ menu, restaurantId, selectedMenu }: Props) => {
  return (
    <div className="bg-background border-b border-border">
      <Carousel>
        <CarouselContent className="p-4">
          {menu.map((item) => (
            <CarouselItem key={item.id} className="basis-[300px]">
              <Link
                className={`block p-6 rounded-xl border transition-all duration-200 ease-out cursor-pointer
                ${
                  selectedMenu === item.id
                    ? "bg-primary/5 border-primary"
                    : "bg-card hover:bg-accent/50 border-border"
                }`}
                href={`/restaurant/${restaurantId}/menu/${item.id}`}
              >
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default MenuList;
