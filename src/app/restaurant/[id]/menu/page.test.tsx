import { test, vi } from "vitest";
import RestaurantMenu from "./page";
import { render } from "@testing-library/react";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({}),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

test("Restaurant menu page", async () => {
  render(
    await RestaurantMenu({
      params: Promise.resolve({
        id: "1",
      }),
    }),
  );
});
