import { expect, test, vi } from "vitest";
import CancelPage from "./page";
import { fireEvent, render, screen } from "@testing-library/react";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({}),
}));

test("CancelPage", async () => {
  render(await CancelPage());
});
