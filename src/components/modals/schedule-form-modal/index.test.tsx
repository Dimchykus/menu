import { expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ScheduleFormModal from ".";
import { ModalProvider } from "@/context/modals";
import ModalContainer from "@/views/modals";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({}),
}));

vi.mock("./actions", () => ({
  handleCreateSchedule: vi.fn(),
}));

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
