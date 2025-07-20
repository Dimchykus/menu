"use client";

import { RestaurantMenuWithCategories } from "@/lib/db/actions/menu";
import { Utensils } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Link from "next/link";
import Sticky from "react-stickynode";

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
    <Sticky enabled top={0} className="z-10">
      <div className="bg-background border-b border-border sticky top-0 z-10 w-full">
        <Carousel>
          <CarouselContent className="p-4">
            {selectedMenuData.categories?.map((category) => (
              <CarouselItem
                key={category.id}
                className="basis-[250px] sm:basis-[300px]"
              >
                <Link
                  href={`/restaurant/${restaurantId}/menu/${selectedMenu}#category-${category.id}`}
                  data-testid={`menu-category-link-${category.id}`}
                  className="block group bg-card hover:bg-accent/50 rounded-xl p-2 sm:p-4 border border-border transition-colors"
                  onClick={() => {
                    const categoryBlock = document.getElementById(
                      `category-${category.id}`,
                    );

                    if (!categoryBlock) return;

                    categoryBlock.scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                      inline: "center",
                    });
                  }}
                >
                  <div className="flex-1 flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Utensils className="w-6 h-6" />
                    </div>
                    <div className="self-center flex-1 flex justify-between sm:flex-col">
                      <h3 className="font-medium text-lg mb-2 text-ellipsis overflow-hidden">
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
    </Sticky>
  );
};

export default MenuCategories;
