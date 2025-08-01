import { expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import PayButton from "./pay-button";

vi.mock("./actions", () => ({
  handleCheckout: vi.fn(),
}));

test("PayButton component renders correctly", () => {
  const mockProps = {
    planId: 1,
    price: 999,
    planName: "Basic Plan",
  };

  render(<PayButton {...mockProps} />);

  expect(screen.getByText("Get Started")).toBeInTheDocument();

  const button = screen.getByRole("button", { name: "Get Started" });

  fireEvent.click(button);
});
