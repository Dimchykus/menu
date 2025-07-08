import { expect, test, vi } from "vitest";
import HomePage from "./page";
import { fireEvent, render, screen } from "@testing-library/react";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({}),
}));
vi.mock("@/lib/db/actions/subscriptions", () => ({
  getSubscriptionTypes: vi.fn().mockResolvedValue([]),
}));

test("Home page", async () => {
  render(await HomePage());
});
