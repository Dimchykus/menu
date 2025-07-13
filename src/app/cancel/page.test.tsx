import { test, vi } from "vitest";
import CancelPage from "./page";
import { render } from "@testing-library/react";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({}),
}));

test("CancelPage", async () => {
  render(await CancelPage());
});
