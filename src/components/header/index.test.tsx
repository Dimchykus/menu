import { expect, test, vi } from "vitest";
import Header from "./index";
import { fireEvent, render, screen } from "@testing-library/react";
import { SidebarProvider } from "../ui/sidebar";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({}),
}));

test("Header", async () => {
  render(<SidebarProvider>{await Header({})}</SidebarProvider>);
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

test("Header with title", async () => {
  render(
    <SidebarProvider>{await Header({ title: "Test Title" })}</SidebarProvider>,
  );

  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "Test Title",
  );
});
