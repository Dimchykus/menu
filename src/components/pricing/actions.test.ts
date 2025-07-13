import { expect, test, vi } from "vitest";
import { handleCheckout } from "./actions";

vi.mock("@/lib/actions/auth", () => ({
  getUser: vi.fn(),
}));

vi.mock("@/lib/db/actions/subscriptions", () => ({
  checkIfUserHasActiveSubscription: vi.fn(),
}));

vi.mock("@stripe/stripe-js/pure", () => ({
  loadStripe: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

global.fetch = vi.fn();

test("handleCheckout function exists and is callable", () => {
  expect(typeof handleCheckout).toBe("function");
  expect(handleCheckout).toBeDefined();
});
