import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Restaurant from ".";
import { SidebarProvider } from "@/components/ui/sidebar";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({}),
}));

vi.mock("@/utils/isMobile", () => ({
  isMobileDevice: vi.fn(),
}));

vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: vi.fn(),
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

test("renders Restaurant", async () => {
  render(
    await Restaurant({
      restaurant: {
        address: "123 Main St",
        createdAt: new Date(),
        description: "Test Description",
        id: 1,
        name: "Test Restaurant",
        userId: 1,
        phone: "1234567890",
      },
      schedule: [
        {
          close: "18:00",
          dayOfWeek: "Monday",
          id: 1,
          open: "10:00",
          restaurantId: 1,
          isClosed: false,
        },
        {
          close: "00:00",
          dayOfWeek: new Date().toLocaleString("en-US", { weekday: "long" }), // current day
          id: 1,
          open: "23:59",
          restaurantId: 1,
          isClosed: false,
        },
      ],
      menus: [],
    }),
  );

  const restaurant = screen.getByText("Test Restaurant");
  expect(restaurant).toBeInTheDocument();
});

test("renders Restaurant without schedule", async () => {
  render(
    await Restaurant({
      restaurant: {
        address: "123 Main St",
        createdAt: new Date(),
        description: "Test Description",
        id: 1,
        name: "Test Restaurant",
        userId: 1,
        phone: "1234567890",
      },
      schedule: [],
      menus: [],
    }),
  );

  const restaurant = screen.getByText("Test Restaurant");
  expect(restaurant).toBeInTheDocument();
});
