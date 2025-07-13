import { test, vi } from "vitest";
import Menu from "./page";
import { render } from "@testing-library/react";
import * as menuActions from "@/lib/db/actions/menu";
import { SidebarProvider } from "@/components/ui/sidebar";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({}),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("@/lib/db/actions/menu", () => ({
  getRestaurantById: vi.fn().mockResolvedValue({
    id: 1,
    userId: 1,
    name: "Test Restaurant",
    description: "Test Description",
    address: "123 Test St",
    phone: "555-0123",
    createdAt: new Date(),
  }),
  getRestaurantMenusWithCategories: vi.fn().mockResolvedValue([]),
}));

test("Restaurant page", async () => {
  render(
    <SidebarProvider>
      {/* {await Menu({
        params: Promise.resolve({
          id: "1",
          menuId: "1",
        }),
        searchParams: Promise.resolve({
          category: "1",
        }),
      })} */}
      <Menu
        params={Promise.resolve({
          id: "1",
          menuId: "1",
        })}
        searchParams={Promise.resolve({
          category: "1",
        })}
      />
    </SidebarProvider>,
  );
});

test("Restaurant menu page with invalid restaurant", async () => {
  vi.mocked(menuActions.getRestaurantById).mockResolvedValue(null);
  vi.mocked(menuActions.getRestaurantMenusWithCategories).mockResolvedValue([]);

  render(
    <SidebarProvider>
      <Menu
        params={Promise.resolve({
          id: "1",
          menuId: "1",
        })}
        searchParams={Promise.resolve({
          category: "1",
        })}
      />
    </SidebarProvider>,
  );
});
