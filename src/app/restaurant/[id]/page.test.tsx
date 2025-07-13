import { test, vi } from "vitest";
import Restaurant from "./page";
import { render } from "@testing-library/react";
import * as menuActions from "@/lib/db/actions/menu";

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
  getRestaurantMenu: vi.fn().mockResolvedValue([]),
  getSchedule: vi.fn().mockResolvedValue([]),
}));

test("Restaurant page", async () => {
  render(
    await Restaurant({
      params: Promise.resolve({
        id: "1",
      }),
    }),
  );
});

test("Restaurant page with invalid restaurant", async () => {
  vi.mocked(menuActions.getRestaurantById).mockResolvedValue(null);

  render(
    await Restaurant({
      params: Promise.resolve({
        id: "1",
      }),
    }),
  );
});
