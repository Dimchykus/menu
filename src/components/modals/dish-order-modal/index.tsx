"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/lib/hooks/use-modals";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  handleUpdateDishOrder,
  handleUpdateMenuOrder,
  handleUpdateCategoryOrder,
  getAllMenuData,
} from "./actions";

const DishOrderModal = () => {
  const { closeModal } = useModal();

  const {
    mutate,
    isPending,
    data: groupedData,
  } = useMutation({
    mutationFn: getAllMenuData,
  });

  const updateDishOrder = async (dishId: string, newOrder: number) => {
    await handleUpdateDishOrder(parseInt(dishId, 10), newOrder);

    mutate();

    toast.success("Dish order updated");
  };

  const updateMenuOrder = async (menuId: string, newOrder: number) => {
    await handleUpdateMenuOrder(parseInt(menuId, 10), newOrder);

    mutate();

    toast.success("Menu order updated");
  };

  const updateCategoryOrder = async (categoryId: string, newOrder: number) => {
    await handleUpdateCategoryOrder(parseInt(categoryId, 10), newOrder);

    mutate();

    toast.success("Category order updated");
  };

  useEffect(() => {
    mutate();
  }, []);

  if (!groupedData || isPending) {
    return (
      <Dialog open>
        <DialogContent className="sm:max-w-[800px] [&>button:first-of-type]:hidden">
          <div className="flex items-center justify-center p-8">
            <DialogTitle>Loading...</DialogTitle>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-hidden [&>button:first-of-type]:hidden">
        <DialogHeader>
          <DialogTitle>Order Dishes</DialogTitle>
          <DialogDescription>
            Manage the order of your dishes using the arrow buttons
            {isPending && " (Updating...)"}
          </DialogDescription>
          <DialogClose asChild onClick={() => closeModal("dishOrder")}>
            <Button
              className="absolute right-4 top-4 size-6 p-0"
              disabled={isPending}
            >
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[60vh] space-y-4">
          {Object.keys(groupedData || {}).map((restaurantId) => (
            <div key={restaurantId}>
              <h2 className="text-lg font-bold">
                {groupedData[restaurantId].restaurantName}
              </h2>
              <div className="flex flex-col gap-2 ml-4">
                {Object.keys(groupedData[restaurantId].menus || {})
                  .sort(
                    (a, b) =>
                      groupedData[restaurantId].menus[b].order -
                      groupedData[restaurantId].menus[a].order,
                  )
                  .map((menuId) => (
                    <div key={menuId}>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-md font-bold">
                          {groupedData[restaurantId].menus[menuId].order}.{" "}
                          {groupedData[restaurantId].menus[menuId].menuName}
                        </h3>
                        <div className="flex items-center gap-2 ml-auto">
                          <Button
                            variant="outline"
                            size="icon"
                            disabled={isPending}
                            onClick={() =>
                              updateMenuOrder(
                                menuId,
                                groupedData[restaurantId].menus[menuId].order +
                                  1,
                              )
                            }
                          >
                            <ChevronUp />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            disabled={
                              isPending ||
                              groupedData[restaurantId].menus[menuId].order ===
                                0
                            }
                            onClick={() =>
                              updateMenuOrder(
                                menuId,
                                groupedData[restaurantId].menus[menuId].order -
                                  1,
                              )
                            }
                          >
                            <ChevronDown />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        {Object.keys(
                          groupedData[restaurantId].menus[menuId].categories ||
                            {},
                        )
                          .sort(
                            (a, b) =>
                              groupedData[restaurantId].menus[menuId]
                                .categories[b].order -
                              groupedData[restaurantId].menus[menuId]
                                .categories[a].order,
                          )
                          .map((categoryId) => (
                            <div key={categoryId} className="mr-4">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="text-sm font-bold">
                                  {
                                    groupedData[restaurantId].menus[menuId]
                                      .categories[categoryId].order
                                  }
                                  .{" "}
                                  {
                                    groupedData[restaurantId].menus[menuId]
                                      .categories[categoryId].categoryName
                                  }
                                </h4>
                                <div className="flex items-center gap-2 ml-auto">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    disabled={isPending}
                                    onClick={() =>
                                      updateCategoryOrder(
                                        categoryId,
                                        groupedData[restaurantId].menus[menuId]
                                          .categories[categoryId].order + 1,
                                      )
                                    }
                                  >
                                    <ChevronUp />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    disabled={
                                      isPending ||
                                      groupedData[restaurantId].menus[menuId]
                                        .categories[categoryId].order === 0
                                    }
                                    onClick={() =>
                                      updateCategoryOrder(
                                        categoryId,
                                        groupedData[restaurantId].menus[menuId]
                                          .categories[categoryId].order - 1,
                                      )
                                    }
                                  >
                                    <ChevronDown />
                                  </Button>
                                </div>
                              </div>

                              <div className="flex flex-col gap-2 ml-4">
                                {Object.keys(
                                  groupedData[restaurantId].menus[menuId]
                                    .categories[categoryId].dishes || {},
                                )
                                  .sort(
                                    (a, b) =>
                                      groupedData[restaurantId].menus[menuId]
                                        .categories[categoryId].dishes[b]
                                        .order -
                                      groupedData[restaurantId].menus[menuId]
                                        .categories[categoryId].dishes[a].order,
                                  )
                                  .map((dishId) => (
                                    <div
                                      key={dishId}
                                      className="flex items-center gap-2 mr-8"
                                    >
                                      {
                                        groupedData[restaurantId].menus[menuId]
                                          .categories[categoryId].dishes[dishId]
                                          .order
                                      }
                                      .{" "}
                                      {
                                        groupedData[restaurantId].menus[menuId]
                                          .categories[categoryId].dishes[dishId]
                                          .dishName
                                      }
                                      <div className="flex items-center gap-2 ml-auto">
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          disabled={isPending}
                                          onClick={() =>
                                            updateDishOrder(
                                              dishId,
                                              groupedData[restaurantId].menus[
                                                menuId
                                              ].categories[categoryId].dishes[
                                                dishId
                                              ].order + 1,
                                            )
                                          }
                                        >
                                          <ChevronUp />
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          disabled={
                                            isPending ||
                                            groupedData[restaurantId].menus[
                                              menuId
                                            ].categories[categoryId].dishes[
                                              dishId
                                            ].order === 0
                                          }
                                          onClick={() =>
                                            updateDishOrder(
                                              dishId,
                                              groupedData[restaurantId].menus[
                                                menuId
                                              ].categories[categoryId].dishes[
                                                dishId
                                              ].order - 1,
                                            )
                                          }
                                        >
                                          <ChevronDown />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {Object.keys(groupedData || {}).length === 0 && (
          <div className="overflow-y-auto max-h-[60vh] space-y-4">
            <div className="text-center p-8 text-gray-500">
              No dishes found. Create some restaurants, menus, categories, and
              dishes first.
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DishOrderModal;
