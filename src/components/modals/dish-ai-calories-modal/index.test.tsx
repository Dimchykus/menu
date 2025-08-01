import { expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ModalProvider } from "@/context/modals";
import ModalContainer from "@/views/modals";
import { calculateDishCaloriesAction } from "./actions";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({}),
}));

vi.mock("./actions", () => ({
  calculateDishCaloriesAction: vi.fn(),
}));

vi.mock("@/lib/db/actions/menu", () => ({
  getDishById: vi.fn(),
}));

test("Ai Dish Calories Modal", async () => {
  vi.mocked(calculateDishCaloriesAction).mockResolvedValue({
    success: true,
    calories: "100 calories",
  });

  render(
    <ModalProvider defaultValues={{ dishAiCalories: { dishId: 1 } }}>
      <ModalContainer />
    </ModalProvider>,
  );

  await vi.dynamicImportSettled();

  const title = screen.getByText("AI Nutritional Analysis");

  const button = screen.getByText("Calculate Calories");

  expect(title).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  await waitFor(() => {
    expect(
      screen.getByText("AI is analyzing your dish..."),
    ).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText("100 calories")).toBeInTheDocument();
  });

  const closeModalButton = screen.getByTestId("close-modal");
  expect(closeModalButton).toBeInTheDocument();

  fireEvent.click(closeModalButton);

  await waitFor(() => {
    const modal = screen.queryByTestId("modal");

    expect(modal).not.toBeInTheDocument();
  });
});

test("Ai Dish Calories Modal - failed", async () => {
  vi.mocked(calculateDishCaloriesAction).mockResolvedValue({
    success: false,
    error: "Error generate response",
  });

  render(
    <ModalProvider defaultValues={{ dishAiCalories: { dishId: 1 } }}>
      <ModalContainer />
    </ModalProvider>,
  );

  await vi.dynamicImportSettled();

  const title = screen.getByText("AI Nutritional Analysis");

  const button = screen.getByText("Calculate Calories");

  expect(title).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  await waitFor(() => {
    expect(
      screen.getByText("AI is analyzing your dish..."),
    ).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText("Calculation Failed")).toBeInTheDocument();
  });
});
