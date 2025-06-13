import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import EditDishes from "./edit-dish";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { getUserEditCategories } from "@/lib/db/actions/menu";
import { Suspense } from "react";

interface Props {
  menuId: number;
}

const EditCategories = async ({ menuId }: Props) => {
  const categories = await getUserEditCategories(menuId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Categories</h3>
        <Button size="sm" className="gap-2">
          <PlusCircle className="w-4 h-4" />
          Add Category
        </Button>
      </div>
      <Accordion type="multiple" className="space-y-4">
        {categories?.map((category) => (
          <AccordionItem
            key={category.id}
            value={category.id.toString()}
            className="border rounded-lg px-6"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex flex-1 items-center justify-between pr-4">
                <div>
                  <h4 className="text-base font-medium">{category.name}</h4>
                  {category.description && (
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
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
