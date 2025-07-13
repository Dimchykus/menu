import { expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { OrderDishesButton } from "./order-dishes-button";

vi.mock("@/lib/hooks/use-modals", () => ({
  useModal: vi.fn().mockReturnValue({
    openModal: vi.fn(),
  }),
}));

test("Render OrderDishesButton", () => {
  render(<OrderDishesButton />);

  const button = screen.getByText("Order Dishes");

  expect(button).toBeInTheDocument();

  fireEvent.click(button);
});
