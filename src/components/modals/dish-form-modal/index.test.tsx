import { expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ModalProvider } from "@/context/modals";
import ModalContainer from "@/views/modals";
import { getDishById } from "@/lib/db/actions/menu";
import { handleUpdateDish } from "./actions";
import DishFormModal from ".";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({}),
}));

vi.mock("./actions", () => ({
  handleUpdateDish: vi.fn(),
}));

vi.mock("@/lib/db/actions/menu", () => ({
  getDishById: vi.fn(),
}));

test("Dish Form Modal", async () => {
  render(
    <ModalProvider defaultValues={{ dishForm: {} }}>
      <ModalContainer />
    </ModalProvider>,
  );

  await vi.dynamicImportSettled();

  const title = screen.getByText("Create menu");

  expect(title).toBeInTheDocument();
});

test("Dish Form Modal - get dish by id", async () => {
  vi.mocked(getDishById).mockResolvedValue({
    id: 1,
    name: "A dish",
    description: "A description",
    price: 100,
    categoryId: 1,
    image: null,
    weight: null,
    weight_type: null,
    order: null,
  });

  render(
    <ModalProvider defaultValues={{ dishForm: { id: 1 } }}>
      <ModalContainer />
    </ModalProvider>,
  );

  await vi.dynamicImportSettled();

  const name = screen.getByLabelText("Name");

  expect(name).toHaveValue("A dish");

  const description = screen.getByLabelText("Description");

  expect(description).toHaveValue("A description");

  const price = screen.getByLabelText("Price");

  expect(price).toHaveValue(100);
});

test("Dish Form Modal - create dish", async () => {
  render(
    <ModalProvider defaultValues={{ dishForm: {} }}>
      <ModalContainer />
    </ModalProvider>,
  );

  await vi.dynamicImportSettled();

  const name = screen.getByLabelText("Name");
  const description = screen.getByLabelText("Description");
  const price = screen.getByLabelText("Price");

  fireEvent.change(name, { target: { value: "A dish" } });
  fireEvent.change(description, { target: { value: "A description" } });
  fireEvent.change(price, { target: { value: 100 } });

  const submitButton = screen.getByText("Create");

  fireEvent.click(submitButton);
});

test("Dish Form Modal - create dish with no name", async () => {
  render(
    <ModalProvider defaultValues={{ dishForm: {} }}>
      <DishFormModal />
    </ModalProvider>,
  );

  await vi.dynamicImportSettled();

  const name = screen.getByLabelText("Name");
  const description = screen.getByLabelText("Description");
  const price = screen.getByLabelText("Price");

  fireEvent.change(price, { target: { value: 100 } });

  const submitButton = screen.getByText("Create");

  fireEvent.click(submitButton);

  await waitFor(() => {
    const error = screen.getByText("Name is required", { exact: false });

    expect(error).toBeInTheDocument();
  });

  fireEvent.change(name, { target: { value: "A dish" } });

  await waitFor(() => {
    const error = screen.getByText("Description is required", {
      exact: false,
    });

    expect(error).toBeInTheDocument();
  });

  fireEvent.change(description, { target: { value: "A description" } });

  fireEvent.click(submitButton);

  await waitFor(() => {
    const errors = screen.queryByTestId("error-messages");

    expect(errors).not.toBeInTheDocument();
  });
});

test("Dish Form Modal - close button", async () => {
  render(
    <ModalProvider defaultValues={{ dishForm: {} }}>
      <ModalContainer />
    </ModalProvider>,
  );

  await vi.dynamicImportSettled();

  const closeButton = screen.getByTestId("close-button");

  fireEvent.click(closeButton);

  await waitFor(() => {
    const modal = screen.queryByTestId("modal");

    expect(modal).not.toBeInTheDocument();
  });
});
