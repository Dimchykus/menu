import { test, vi } from "vitest";
import { render } from "@testing-library/react";
import RestaurantMenu from "./index";
import { getRestaurantMenu } from "@/lib/db/actions/menu";

vi.mock("@/lib/db/actions/menu", () => ({
  getRestaurantMenu: vi.fn().mockResolvedValue([]),
  getRestaurantById: vi.fn(),
}));

test("Restaurant Menu - no restaurants", async () => {
  vi.mocked(getRestaurantMenu).mockResolvedValue([]);

  render(<RestaurantMenu restaurantId={1} />);
});

test("Restaurant Menu - with restaurants", async () => {
  vi.mocked(getRestaurantMenu).mockResolvedValue([
    {
      id: 1,
      name: "A name",
      description: "A description",
      address: "123 Main St",
      phone: "1234567890",
      userId: 1,
      createdAt: new Date(),
    },
  ]);

  render(<RestaurantMenu restaurantId={1} />);
});
