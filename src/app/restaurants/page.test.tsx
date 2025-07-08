import { test, vi } from "vitest";
import Restaurants from "./page";
import { render } from "@testing-library/react";
import { getRestaurants } from "@/lib/db/actions/menu";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({}),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("@/lib/db/actions/menu", () => ({
  getRestaurants: vi.fn().mockResolvedValue([]),
}));

test("Restaurant menu page", async () => {
  render(<Restaurants />);
});

test("Restaurant menu page with invalid restaurants", async () => {
  vi.mocked(getRestaurants).mockResolvedValue(null);
  render(<Restaurants />);
});
