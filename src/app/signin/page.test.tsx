import { test, vi } from "vitest";
import Signin from "./page";
import { render } from "@testing-library/react";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue(null),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

test("Signin page", async () => {
  render(<Signin />);
});
