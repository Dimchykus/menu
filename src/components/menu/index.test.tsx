import { test, vi } from "vitest";
import Menu from "./";
import MenuCategories from "./menu-categories";
import MenuDishes from "./menu-dishes";
import MenuCategoryDishes from "./menu-category-dishes";
import { render } from "@testing-library/react";
import { getCategoryDishes } from "@/lib/db/actions/menu";

vi.mock("@/lib/actions/auth", () => ({
  logout: vi.fn(),
}));

vi.mock("@/lib/db/actions/menu", () => ({
  getCategoryDishes: vi.fn().mockResolvedValue([]),
}));

test("Render Menu", async () => {
  render(
    <Menu
      selectedMenu={1}
      selectedCategory={1}
      restaurant={{
        address: "123 Main St",
        createdAt: new Date(),
        description: "A description",
        id: 1,
        name: "A name",
        phone: "1234567890",
        userId: 1,
      }}
      menu={[
        {
          description: "A description",
          id: 1,
          name: "A name",
          restaurantId: 1,
          categories: [
            {
              description: "A description",
              id: 1,
              name: "A name",
              dishesCount: 1,
            },
          ],
        },
      ]}
    />,
  );
});

test("Render Menu Categories - without not existing menu", async () => {
  render(
    <MenuCategories
      menu={[
        {
          description: "A description",
          id: 1,
          name: "A name",
          restaurantId: 1,
          categories: [
            {
              description: "A description",
              id: 1,
              name: "A name",
              dishesCount: 1,
            },
          ],
        },
      ]}
      restaurantId={1}
      selectedMenu={0}
    />,
  );
});

test("Render Menu Dishes", async () => {
  vi.mocked(getCategoryDishes).mockResolvedValue([
    {
      image: null,
      id: 1,
      name: "A name",
      description: null,
      order: null,
      categoryId: 1,
      price: 10,
      weight: null,
      weight_type: null,
    },
  ]);

  render(await MenuDishes({ categoryId: 1 }));
});

test("Render Menu Dishes - without dishes", async () => {
  vi.mocked(getCategoryDishes).mockResolvedValue([]);

  render(await MenuDishes({ categoryId: 1 }));
});

test("Render Menu Category Dishes - without menu", async () => {
  render(await MenuCategoryDishes({ menu: [], restaurantId: 1 }));
});
