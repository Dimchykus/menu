import { expect, test, vi } from "vitest";
import MenuNavigation from "./";
import { fireEvent, render, screen } from "@testing-library/react";
import { getCategoryDishes } from "@/lib/db/actions/menu";
import { SidebarProvider } from "../ui/sidebar";

vi.mock("@/lib/actions/auth", () => ({
  logout: vi.fn(),
}));

vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: vi.fn(),
}));

test("Menu Navigation", async () => {
  render(
    <SidebarProvider>
      {await MenuNavigation({
        menu: [
          {
            restaurantId: 1,
            name: "A name",
            description: "A description",
            categories: [
              {
                description: "A description",
                id: 1,
                name: "A name",
                dishesCount: 1,
              },
            ],
            id: 1,
          },
        ],
        restaurant: {
          id: 1,
          name: "A name",
          address: "123 Main St",
          createdAt: new Date(),
          description: "A description",
          phone: "1234567890",
          userId: 1,
        },
        selectedMenu: 1,
      })}
    </SidebarProvider>,
  );
});

test("Menu Navigation - no categories", async () => {
  render(
    <SidebarProvider>
      {await MenuNavigation({
        menu: [
          {
            restaurantId: 1,
            name: "A name",
            description: "A description",
            categories: [],
            id: 1,
          },
        ],
        restaurant: {
          id: 1,
          name: "A name",
          address: "123 Main St",
          createdAt: new Date(),
          description: "A description",
          phone: "1234567890",
          userId: 1,
        },
        selectedMenu: 1,
      })}
    </SidebarProvider>,
  );
});
