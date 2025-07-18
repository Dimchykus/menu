import { expect, test, vi } from "vitest";
import Header from "./index";
import { render, screen } from "@testing-library/react";
import { SidebarProvider } from "../ui/sidebar";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({}),
}));

test("Header", async () => {
  render(<SidebarProvider>{await Header({})}</SidebarProvider>);
});

test("Header with title", async () => {
  render(
    <SidebarProvider>{await Header({ title: "Test Title" })}</SidebarProvider>,
  );

  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "Test Title",
  );
});
