import { expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ModalProvider } from "@/context/modals";
import ModalContainer from "@/views/modals";
import { getCategoryById } from "@/lib/db/actions/menu";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({}),
}));

vi.mock("./actions", () => ({
  handleCreateCategory: vi.fn(),
}));

vi.mock("@/lib/db/actions/menu", () => ({
  getCategoryById: vi.fn(),
}));

test("Category Form Modal", async () => {
  render(
    <ModalProvider defaultValues={{ categoryForm: {} }}>
      <ModalContainer />
    </ModalProvider>,
  );

  await vi.dynamicImportSettled();

  const title = screen.getByText("Create category");

  expect(title).toBeInTheDocument();

  const close = screen.getByTestId("close-modal");

  fireEvent.click(close);

  await waitFor(() => {
    expect(screen.queryByTestId("category-form-modal")).not.toBeInTheDocument();
  });
});

test("Category Form Modal - get category by id", async () => {
  const func = vi.mocked(getCategoryById).mockResolvedValue({
    id: 1,
    name: "A category",
    description: "A description",
    menuId: 1,
    order: 1,
  });

  render(
    <ModalProvider defaultValues={{ categoryForm: { id: 1 } }}>
      <ModalContainer />
    </ModalProvider>,
  );

  await vi.dynamicImportSettled();

  await waitFor(() => {
    expect(func).toHaveBeenCalledWith(1);
  });

  const name = screen.getByLabelText("Name");
  const description = screen.getByLabelText("Description");

  expect(name).toHaveValue("A category");
  expect(description).toHaveValue("A description");

  const submit = screen.getByText("Update");

  fireEvent.click(submit);

  await waitFor(() => {
    expect(screen.queryByTestId("category-form-modal")).not.toBeInTheDocument();
  });
});
