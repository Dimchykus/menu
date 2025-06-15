import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import EditDishes from "./edit-dish";
import { Eye } from "lucide-react";
import { getUserEditCategories } from "@/lib/db/actions/menu";
import { Suspense } from "react";
import Link from "next/link";
import EditCategoryButton from "./components/edit-category-button";
import AddCategoryButton from "./components/new-category-button";
import DeleteCategoryButton from "./components/delete-category-button";

interface Props {
  menuId: number;
  restaurantId: number;
}

const EditCategories = async ({ restaurantId, menuId }: Props) => {
  const categories = await getUserEditCategories(menuId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Categories</h3>
        <AddCategoryButton menuId={menuId} />
      </div>
      <Accordion type="single" className="space-y-4">
        {categories?.map((category) => (
          <AccordionItem
            key={category.id}
            value={category.id.toString()}
            className="border rounded-lg px-6"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex flex-1 items-center justify-between pr-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium">
                      {category.name}
                    </span>
                    <EditCategoryButton id={category.id} menuId={menuId} />
                    <Link
                      href={`/restaurant/${restaurantId}/menu/${menuId}#${category.id}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <DeleteCategoryButton id={menuId} />
                  </div>
                  {category.description && (
                    <span className="text-sm text-muted-foreground">
                      {category.description}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                    {/* {category.dishesCount || 0} dishes */}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-4 pb-6">
                <Suspense fallback={<div>Loading...</div>}>
                  <EditDishes categoryId={category.id} />
                </Suspense>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default EditCategories;
