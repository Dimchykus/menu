import { expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MenuFormModal from ".";

const mockCloseModal = vi.fn();

vi.mock("./actions", () => ({
  handleCreateMenu: vi.fn(),
}));

vi.mock("@/lib/db/actions/menu", () => ({
  getMenuById: vi.fn().mockResolvedValue({
    id: 1,
    name: "Test Menu",
    description: "Test Description",
    restaurantId: 1,
    order: 0,
  }),
}));

vi.mock("@/lib/hooks/use-modals", () => ({
  useModal: () => ({
    closeModal: mockCloseModal,
  }),
}));

vi.mock("@/context/modals", () => ({
  ModalPropsMap: {},
}));

test("Create menu", async () => {
  const { handleCreateMenu } = await import("./actions");

  mockCloseModal.mockClear();

  vi.mocked(handleCreateMenu).mockResolvedValue({
    success: true,
    fields: {
      id: "1",
      name: "Test Menu",
      description: "A wonderful test menu",
      restaurantId: 1,
    },
    errors: null,
  });

  render(<MenuFormModal restaurantId={1} />);

  expect(screen.getByText("Create menu")).toBeInTheDocument();
  expect(screen.getByText("Enter menu information")).toBeInTheDocument();

  const nameInput = screen.getByLabelText("Name");
  const descriptionInput = screen.getByLabelText("Description");

  fireEvent.change(nameInput, { target: { value: "Test Menu" } });
  fireEvent.change(descriptionInput, {
    target: { value: "A wonderful test menu" },
  });

  expect(nameInput).toHaveValue("Test Menu");
  expect(descriptionInput).toHaveValue("A wonderful test menu");

  const submitButton = screen.getByRole("button", { name: "Create" });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockCloseModal).toHaveBeenCalledWith("menuForm");
  });

  expect(handleCreateMenu).toHaveBeenCalled();
});

test("Edit menu state", () => {
  render(<MenuFormModal restaurantId={1} id={1} key={1} />);

  expect(screen.getByText("Edit menu")).toBeInTheDocument();
  expect(screen.getByText("Enter menu information")).toBeInTheDocument();
});

test("Edit menu state with bad response", () => {
  vi.mock("@/lib/db/actions/menu", () => ({
    getMenuById: vi.fn().mockResolvedValue({
      id: 1,
    }),
  }));

  render(<MenuFormModal restaurantId={1} id={1} key={1} />);

  expect(screen.getByText("Edit menu")).toBeInTheDocument();
  expect(screen.getByText("Enter menu information")).toBeInTheDocument();
});

test("Check close modal button", () => {
  render(<MenuFormModal id={1} key={1} />);

  const closeModalButton = screen.getByTestId("close-modal");
  expect(closeModalButton).toBeInTheDocument();

  fireEvent.click(closeModalButton);
});
