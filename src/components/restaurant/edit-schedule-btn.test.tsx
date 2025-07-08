import { expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import EditScheduleBtn from "./edit-schedule-btn";

const mockOpenModal = vi.fn();

vi.mock("@/lib/hooks/use-modals", () => ({
  useModal: () => ({
    openModal: mockOpenModal,
  }),
}));

test("renders EditScheduleBtn with correct text", () => {
  render(<EditScheduleBtn id={1} />);

  const button = screen.getByRole("button", { name: "Edit schedule" });
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("Edit schedule");
});

test("calls openModal with correct parameters when clicked", () => {
  const scheduleId = 24;
  render(<EditScheduleBtn id={scheduleId} />);

  const button = screen.getByRole("button", { name: "Edit schedule" });
  fireEvent.click(button);

  expect(mockOpenModal).toHaveBeenCalledWith("scheduleForm", {
    id: scheduleId,
  });
  expect(mockOpenModal).toHaveBeenCalledTimes(1);
});
