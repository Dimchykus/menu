import { expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ScheduleFormModal from ".";
import { ModalProvider } from "@/context/modals";
import ModalContainer from "@/views/modals";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({}),
}));

// // Mock Next.js dynamic import to return the component directly
// vi.mock("next/dynamic", () => ({
//   __esModule: true,
//   default: (importFn: () => Promise<any>) => {
//     // For the schedule form modal, return the actual component
//     if (importFn.toString().includes("schedule-form-modal")) {
//       return ScheduleFormModal;
//     }
//     // For other dynamic imports, return a simple div
//     return () => <div>Mocked Component</div>;
//   },
// }));

// // Mock the toast for testing
// vi.mock("sonner", () => ({
//   toast: {
//     error: vi.fn(),
//   },
// }));

// Mock the action
vi.mock("./actions", () => ({
  handleCreateSchedule: vi.fn(),
}));

// Create a mock closeModal function to test if it's called
const mockCloseModal = vi.fn();

// Mock the useModal hook at the top level
// vi.mock("@/lib/hooks/use-modals", () => ({
//   useModal: () => ({
//     modals: {
//       scheduleForm: {
//         id: 1,
//       },
//     },
//     openModal: vi.fn(),
//     closeModal: mockCloseModal,
//   }),
// }));

// vi.mock("@/context/modals", () => ({
//   ModalPropsMap: {},
// }));

test("Create restaurant", async () => {
  render(
    <ModalProvider>
      <ScheduleFormModal id={1} />
    </ModalProvider>,
  );

  const input = screen.getByTestId("monday.start");
  fireEvent.change(input, { target: { value: "10:00" } });

  const input2 = screen.getByTestId("monday.close");
  fireEvent.change(input2, { target: { value: "18:00" } });

  const submitButton = screen.getByText("Save");
  fireEvent.click(submitButton);
});

test("Create restaurant - cancel button", async () => {
  render(
    <ModalProvider defaultValues={{ scheduleForm: { id: 1 } }}>
      <ModalContainer />
    </ModalProvider>,
  );

  await vi.dynamicImportSettled();

  const title = screen.getByText("Create restaurant schedule");

  const closeButton = screen.getByText("Cancel");
  fireEvent.click(closeButton);

  expect(title).not.toBeInTheDocument();
});

test("Create restaurant - close button", async () => {
  render(
    <ModalProvider defaultValues={{ scheduleForm: { id: 1 } }}>
      <ModalContainer />
    </ModalProvider>,
  );

  await vi.dynamicImportSettled();

  const title = screen.getByText("Create restaurant schedule");
  expect(title).toBeInTheDocument();

  const closeButton = screen.getByTestId("close-button");
  fireEvent.click(closeButton);

  expect(title).not.toBeInTheDocument();
});
