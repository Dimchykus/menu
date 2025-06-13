import { RestaurantMenuWithCategories } from "@/lib/db/actions/menu";
import { Utensils } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Link from "next/link";

interface Props {
  menu: RestaurantMenuWithCategories;
  restaurantId: number;
  selectedMenu: number;
}

const MenuCategories = ({ menu, restaurantId, selectedMenu }: Props) => {
  const selectedMenuData = menu.find((item) => item.id === selectedMenu);

  if (!selectedMenuData) {
    return null;
  }

  return (
    <div className="bg-background border-b border-border">
      <Carousel>
        <CarouselContent className="p-4">
          {selectedMenuData.categories?.map((category) => (
            <CarouselItem key={category.id} className="basis-[300px]">
              <Link
                href={`/restaurant/${restaurantId}/menu/${selectedMenu}#category-${category.id}`}
                className="block group bg-card hover:bg-accent/50 rounded-xl p-4 border border-border transition-colors"
                scroll={false}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      {category.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-md">
                        {category.dishesCount} dishes
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default MenuCategories;
