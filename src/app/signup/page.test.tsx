import { test, vi } from "vitest";
import Signup from "./page";
import { render } from "@testing-library/react";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue(null),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

test("Signup page", async () => {
  render(<Signup />);
});
