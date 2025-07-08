import { expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RestaurantFormModal from ".";

const mockCloseModal = vi.fn();

vi.mock("./actions", () => ({
  handleCreateRestaurant: vi.fn(),
}));

vi.mock("@/lib/db/actions/menu", () => ({
  getRestaurantById: vi.fn().mockResolvedValue({
    id: 1,
    name: "Test Restaurant",
    description: "Test Description",
    address: "Test Address",
    phone: "1234567890",
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

test("Create restaurant", async () => {
  const { handleCreateRestaurant } = await import("./actions");

  mockCloseModal.mockClear();

  vi.mocked(handleCreateRestaurant).mockResolvedValue({
    success: true,
    restaurant: {
      id: 1,
      name: "Test Restaurant",
      description: "A wonderful test restaurant",
      address: "123 Test Street, Test City",
      phone: "555-123-4567",
      createdAt: new Date(),
      userId: 1,
    },
  });

  render(<RestaurantFormModal />);

  expect(screen.getByText("Create restaurant")).toBeInTheDocument();
  expect(screen.getByText("Enter restaurant information")).toBeInTheDocument();

  const nameInput = screen.getByLabelText("Name");
  const descriptionInput = screen.getByLabelText("Description");
  const addressInput = screen.getByLabelText("Address");
  const phoneInput = screen.getByLabelText("Phone");

  fireEvent.change(nameInput, { target: { value: "Test Restaurant" } });
  fireEvent.change(descriptionInput, {
    target: { value: "A wonderful test restaurant" },
  });
  fireEvent.change(addressInput, {
    target: { value: "123 Test Street, Test City" },
  });
  fireEvent.change(phoneInput, { target: { value: "555-123-4567" } });

  expect(nameInput).toHaveValue("Test Restaurant");
  expect(descriptionInput).toHaveValue("A wonderful test restaurant");
  expect(addressInput).toHaveValue("123 Test Street, Test City");
  expect(phoneInput).toHaveValue("555-123-4567");

  const submitButton = screen.getByRole("button", { name: "Create" });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockCloseModal).toHaveBeenCalledWith("restaurantForm");
  });

  expect(handleCreateRestaurant).toHaveBeenCalled();
});

test("Edit restaurant state", () => {
  render(<RestaurantFormModal id={1} key={1} />);

  expect(screen.getByText("Edit restaurant")).toBeInTheDocument();
  expect(screen.getByText("Enter restaurant information")).toBeInTheDocument();
});

test("Edit restaurant state with bad response", () => {
  vi.mock("@/lib/db/actions/menu", () => ({
    getRestaurantById: vi.fn().mockResolvedValue({
      id: 1,
    }),
  }));

  render(<RestaurantFormModal id={1} key={1} />);

  expect(screen.getByText("Edit restaurant")).toBeInTheDocument();
  expect(screen.getByText("Enter restaurant information")).toBeInTheDocument();
});

test("Check close modal button", () => {
  render(<RestaurantFormModal id={1} key={1} />);

  const closeModalButton = screen.getByTestId("close-modal");
  expect(closeModalButton).toBeInTheDocument();

  fireEvent.click(closeModalButton);
});

test("Test form validation - empty form submission", async () => {
  const { handleCreateRestaurant } = await import("./actions");

  vi.mocked(handleCreateRestaurant).mockResolvedValue({
    success: false,
    fieldErrors: {
      name: ["Name is required"],
      description: ["Description is required"],
      address: ["Address is required"],
      phone: ["Phone is required"],
    },
  });

  render(<RestaurantFormModal />);

  const submitButton = screen.getByRole("button", { name: "Create" });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  expect(handleCreateRestaurant).toHaveBeenCalled();
});

test("Test form validation - empty description", async () => {
  const { handleCreateRestaurant } = await import("./actions");

  vi.mocked(handleCreateRestaurant).mockResolvedValue({
    success: false,
    fieldErrors: {
      name: ["Name is required"],
      description: ["Description is required"],
      address: ["Address is required"],
      phone: ["Phone is required"],
    },
  });

  render(<RestaurantFormModal />);

  const descriptionInput = screen.getByLabelText("Description");
  const addressInput = screen.getByLabelText("Address");
  const phoneInput = screen.getByLabelText("Phone");

  fireEvent.change(descriptionInput, {
    target: { value: "A wonderful test restaurant" },
  });
  fireEvent.change(addressInput, {
    target: { value: "123 Test Street, Test City" },
  });
  fireEvent.change(phoneInput, { target: { value: "555-123-4567" } });

  const submitButton = screen.getByRole("button", { name: "Create" });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  expect(handleCreateRestaurant).toHaveBeenCalled();
});
