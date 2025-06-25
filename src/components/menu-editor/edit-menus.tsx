import { getUserEditMenus } from "@/lib/db/actions/menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Eye } from "lucide-react";
import EditCategories from "./edit-category";
import { Suspense } from "react";
import Link from "next/link";
import AddMenuButton from "./components/new-menu-button";
import DeleteMenuButton from "./components/delete-menu-button";
import EditMenuButton from "./components/edit-menu-button";

interface Props {
  restaurantId: number;
}

const EditMenus = async ({ restaurantId }: Props) => {
  const menus = await getUserEditMenus(restaurantId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Menus</h3>
        <AddMenuButton restaurantId={restaurantId} />
      </div>
      <Accordion type="single" className="space-y-4">
        {menus?.map((menu) => (
          <AccordionItem
            key={menu.id}
            value={menu.id.toString()}
            className="border rounded-lg px-4 sm:px-6 mb-4"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex flex-1 items-center justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base font-medium">{menu.name}</h4>
                    <EditMenuButton id={menu.id} restaurantId={restaurantId} />
                    <Link href={`/restaurant/${restaurantId}/menu/${menu.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                    <DeleteMenuButton id={menu.id} />
                  </div>
                  {menu.description && (
                    <span className="text-sm text-muted-foreground">
                      {menu.description}
                    </span>
                  )}
                </div>
                {menu.categoriesCount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs whitespace-nowrap bg-primary/10 text-primary px-2 py-1 rounded-md">
                      {menu.categoriesCount || 0} categories
                    </span>
                  </div>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-4 pb-6">
                <Suspense fallback={<div>Loading...</div>}>
                  <EditCategories
                    restaurantId={restaurantId}
                    menuId={menu.id}
                  />
                </Suspense>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default EditMenus;
