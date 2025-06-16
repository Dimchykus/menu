"use client";

import { useState, useEffect } from "react";
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
import {
  getAllUserDishesWithHierarchy,
  updateDishOrder,
} from "@/lib/db/actions/menu";
import { toast } from "sonner";

interface DishHierarchy {
  restaurantId: number;
  restaurantName: string;
  menuId: number | null;
  menuName: string | null;
  categoryId: number | null;
  categoryName: string | null;
  dishId: number | null;
  dishName: string | null;
  dishOrder: number | null;
}

const DishOrderModal = () => {
  const { closeModal } = useModal();
  const [data, setData] = useState<DishHierarchy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllUserDishesWithHierarchy();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch dishes");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOrderChange = async (
    dishId: number,
    direction: "up" | "down",
  ) => {
    const dishIndex = data.findIndex((item) => item.dishId === dishId);
    if (dishIndex === -1) return;

    const currentDish = data[dishIndex];
    const currentOrder = currentDish.dishOrder || 0;
    let newOrder: number;

    if (direction === "up") {
      newOrder = Math.max(0, currentOrder - 1);
    } else {
      newOrder = currentOrder + 1;
    }

    try {
      await updateDishOrder(dishId, newOrder);

      // Update local state
      const newData = [...data];
      newData[dishIndex] = { ...currentDish, dishOrder: newOrder };

      // Re-sort the data
      newData.sort((a, b) => {
        if (a.restaurantName !== b.restaurantName) {
          return (a.restaurantName || "").localeCompare(b.restaurantName || "");
        }
        if (a.menuName !== b.menuName) {
          return (a.menuName || "").localeCompare(b.menuName || "");
        }
        if (a.categoryName !== b.categoryName) {
          return (a.categoryName || "").localeCompare(b.categoryName || "");
        }
        return (a.dishOrder || 0) - (b.dishOrder || 0);
      });

      setData(newData);
      toast.success("Dish order updated");
    } catch (error) {
      console.error("Error updating dish order:", error);
      toast.error("Failed to update dish order");
    }
  };

  const groupedData = data.reduce((acc, item) => {
    if (!item.dishId) return acc;

    const restaurantKey = `${item.restaurantId}-${item.restaurantName}`;
    const menuKey = `${item.menuId}-${item.menuName}`;
    const categoryKey = `${item.categoryId}-${item.categoryName}`;

    if (!acc[restaurantKey]) {
      acc[restaurantKey] = {
        restaurant: { id: item.restaurantId, name: item.restaurantName },
        menus: {},
      };
    }

    if (!acc[restaurantKey].menus[menuKey] && item.menuId) {
      acc[restaurantKey].menus[menuKey] = {
        menu: { id: item.menuId, name: item.menuName },
        categories: {},
      };
    }

    if (
      !acc[restaurantKey].menus[menuKey]?.categories[categoryKey] &&
      item.categoryId
    ) {
      acc[restaurantKey].menus[menuKey].categories[categoryKey] = {
        category: { id: item.categoryId, name: item.categoryName },
        dishes: [],
      };
    }

    acc[restaurantKey].menus[menuKey]?.categories[categoryKey]?.dishes.push({
      id: item.dishId,
      name: item.dishName,
      order: item.dishOrder,
    });

    return acc;
  }, {} as any);

  if (loading) {
    return (
      <Dialog open>
        <DialogContent className="sm:max-w-[800px] [&>button:first-of-type]:hidden">
          <div className="flex items-center justify-center p-8">
            <div>Loading...</div>
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
          </DialogDescription>
          <DialogClose asChild onClick={() => closeModal("dishOrder")}>
            <Button className="absolute right-4 top-4 size-6 p-0">
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[60vh] space-y-4">
          {Object.entries(groupedData).map(
            ([restaurantKey, restaurantData]) => (
              <div key={restaurantKey} className="border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2">
                  {restaurantData.restaurant.name}
                </h3>

                {Object.entries(restaurantData.menus).map(
                  ([menuKey, menuData]) => (
                    <div key={menuKey} className="ml-4 mb-3">
                      <h4 className="font-semibold text-md mb-2 text-blue-600">
                        📋 {menuData.menu.name}
                      </h4>

                      {Object.entries(menuData.categories).map(
                        ([categoryKey, categoryData]) => (
                          <div key={categoryKey} className="ml-4 mb-2">
                            <h5 className="font-medium text-sm mb-2 text-green-600">
                              📂 {categoryData.category.name}
                            </h5>

                            <div className="ml-4 space-y-1">
                              {categoryData.dishes.map((dish: any) => (
                                <div
                                  key={dish.id}
                                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                >
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500 w-8">
                                      #{dish.order || 0}
                                    </span>
                                    <span>{dish.name}</span>
                                  </div>

                                  <div className="flex space-x-1">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleOrderChange(dish.id, "up")
                                      }
                                      className="p-1 h-6 w-6"
                                    >
                                      <ChevronUp className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleOrderChange(dish.id, "down")
                                      }
                                      className="p-1 h-6 w-6"
                                    >
                                      <ChevronDown className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  ),
                )}
              </div>
            ),
          )}

          {Object.keys(groupedData).length === 0 && (
            <div className="text-center p-8 text-gray-500">
              No dishes found. Create some restaurants, menus, categories, and
              dishes first.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DishOrderModal;
