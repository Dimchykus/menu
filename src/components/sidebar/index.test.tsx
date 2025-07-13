import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Sidebar from ".";
import { SidebarProvider } from "@/components/ui/sidebar";

vi.mock("@/utils/isMobile", () => ({
  isMobileDevice: vi.fn(),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

test("renders sidebar with all navigation links on desktop", async () => {
  const { isMobileDevice } = await import("@/utils/isMobile");
  vi.mocked(isMobileDevice).mockResolvedValue(false);

  render(<SidebarProvider>{await Sidebar()}</SidebarProvider>);

  expect(screen.getByText("MenuMaker")).toBeInTheDocument();

  expect(screen.getByText("Profile")).toBeInTheDocument();
  expect(screen.getByText("Restaurants")).toBeInTheDocument();
  expect(screen.getByText("Orders")).toBeInTheDocument();
  expect(screen.getByText("Analytics")).toBeInTheDocument();
  expect(screen.getByText("Settings")).toBeInTheDocument();
  expect(screen.getByText("Help")).toBeInTheDocument();

  expect(screen.getByText("MenuMaker").closest("a")).toHaveAttribute(
    "href",
    "/",
  );
  expect(screen.getByText("Profile").closest("a")).toHaveAttribute(
    "href",
    "/profile",
  );
  expect(screen.getByText("Restaurants").closest("a")).toHaveAttribute(
    "href",
    "/restaurants",
  );
  expect(screen.getByText("Orders").closest("a")).toHaveAttribute(
    "href",
    "/orders",
  );
  expect(screen.getByText("Analytics").closest("a")).toHaveAttribute(
    "href",
    "/analytics",
  );
  expect(screen.getByText("Settings").closest("a")).toHaveAttribute(
    "href",
    "/settings",
  );
  expect(screen.getByText("Help").closest("a")).toHaveAttribute(
    "href",
    "/help",
  );
});

test("returns null on mobile devices", async () => {
  const { isMobileDevice } = await import("@/utils/isMobile");
  vi.mocked(isMobileDevice).mockResolvedValue(true);

  const { container } = render(
    <SidebarProvider>{await Sidebar()}</SidebarProvider>,
  );

  expect(container.firstChild?.firstChild).toBeNull();
});

test("sidebar has correct styling and structure", async () => {
  const { isMobileDevice } = await import("@/utils/isMobile");
  vi.mocked(isMobileDevice).mockResolvedValue(false);

  const { container } = render(
    <SidebarProvider>{await Sidebar()}</SidebarProvider>,
  );

  const sidebar = container.querySelector('[class*="bg-neutral-100"]');
  expect(sidebar).toBeInTheDocument();

  const header = container.querySelector('[class*="h-[81px]"]');
  expect(header).toBeInTheDocument();

  const content = container.querySelector('[class*="p-4"][class*="flex-col"]');
  expect(content).toBeInTheDocument();

  expect(header).toHaveTextContent("MenuMaker");
});

test("sidebar on mobile", async () => {
  const { isMobileDevice } = await import("@/utils/isMobile");
  vi.mocked(isMobileDevice).mockResolvedValue(true);

  const { container } = render(
    <SidebarProvider>{await Sidebar()}</SidebarProvider>,
  );

  expect(container.firstChild?.firstChild).toBeNull();
});
