import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import EditMenus from "./edit-menus";
import { getUserEditRestaurants } from "@/lib/db/actions/menu";
import EditRestaurantButton from "./components/edit-restautant-button";
import AddRestaurantButton from "./components/new-restautant-button";
import DeleteRestaurantButton from "./components/delete-restautant-button";
import { Eye } from "lucide-react";
import Link from "next/link";

const EditRestaurants = async () => {
  const restaurants = await getUserEditRestaurants();

  return (
    <Accordion type="single" className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Restaurants</h3>
        <AddRestaurantButton />
      </div>
      {restaurants?.map((restaurant) => (
        <AccordionItem
          key={restaurant.id}
          value={restaurant.id.toString()}
          className="border rounded-lg px-4 sm:px-6"
        >
          <AccordionTrigger className="hover:no-underline">
            <div className="flex flex-1 items-center justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-medium">{restaurant.name}</h4>
                  <EditRestaurantButton id={restaurant.id} />
                  <Link href={`/restaurant/${restaurant.id}`}>
                    <Eye className="h-4 w-4 p-0" />
                  </Link>
                  <DeleteRestaurantButton id={restaurant.id} />
                </div>
                {restaurant.description && (
                  <span className="text-sm text-muted-foreground">
                    {restaurant.description}
                  </span>
                )}
              </div>
              {restaurant.menusCount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs whitespace-nowrap bg-primary/10 text-primary px-2 py-1 rounded-md">
                    {restaurant.menusCount || 0} menus
                  </span>
                </div>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <EditMenus restaurantId={restaurant.id} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default EditRestaurants;
