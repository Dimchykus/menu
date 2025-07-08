import { expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import EditRestaurantBtn from "./edit-restaurant-btn";

const mockOpenModal = vi.fn();

vi.mock("@/lib/hooks/use-modals", () => ({
  useModal: () => ({
    openModal: mockOpenModal,
  }),
}));

test("renders EditRestaurantBtn with correct text", () => {
  render(<EditRestaurantBtn id={1} />);

  const button = screen.getByRole("button", { name: "Edit restaurant" });
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("Edit restaurant");
});

test("calls openModal with correct parameters when clicked", () => {
  const restaurantId = 42;
  render(<EditRestaurantBtn id={restaurantId} />);

  const button = screen.getByRole("button", { name: "Edit restaurant" });
  fireEvent.click(button);

  expect(mockOpenModal).toHaveBeenCalledWith("restaurantForm", {
    id: restaurantId,
  });
  expect(mockOpenModal).toHaveBeenCalledTimes(1);
});
