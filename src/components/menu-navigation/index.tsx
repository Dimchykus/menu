"use server";

import { Restaurant } from "@/lib/db/schema/menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { RestaurantMenuWithCategories } from "@/lib/db/actions/menu";
import { Sidebar, SidebarContent, SidebarHeader } from "../ui/sidebar";

interface Category {
  id: number;
  name: string;
  description: string | null;
  dishesCount: number;
}

interface Props {
  restaurant: Restaurant;
  menu: RestaurantMenuWithCategories;
  selectedMenu: number;
}

const MenuNavigation = ({ restaurant, menu, selectedMenu }: Props) => {
  return (
    <Sidebar className="w-64 border-r border-border bg-neutral-100">
      <SidebarHeader className="flex items-center justify-center">
        <Link
          href={`/restaurant/${restaurant.id}`}
          className="text-lg font-semibold"
        >
          {restaurant.name}
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4 bg-neutral-100">
        <Accordion
          type="multiple"
          defaultValue={selectedMenu ? [`menu-${selectedMenu}`] : []}
          className="w-full"
        >
          {menu.map((menuItem) => (
            <AccordionItem key={menuItem.id} value={`menu-${menuItem.id}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{menuItem.name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 py-2">
                  {menuItem.categories && menuItem.categories.length > 0 ? (
                    <ul className="space-y-2">
                      {menuItem.categories.map((category: Category) => (
                        <li key={category.id}>
                          <Link
                            href={`#${category.id}`}
                            className="flex items-center justify-between group text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              {/* <ChevronRight className="h-4 w-4" /> */}
                              {category.name}
                            </div>
                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-medium group-hover:bg-primary/20 transition-colors">
                              {category.dishesCount || 0}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No categories available
                    </p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SidebarContent>
    </Sidebar>
  );
};

export default MenuNavigation;
