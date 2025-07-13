import { expect, test, vi } from "vitest";
import LogoutButton from "./";
import { fireEvent, render, screen } from "@testing-library/react";

vi.mock("@/lib/actions/auth", () => ({
  logout: vi.fn(),
}));

test("Render Logout button", async () => {
  const { logout } = await import("@/lib/actions/auth");

  render(<LogoutButton />);

  const button = screen.getByText("Log out");

  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  expect(logout).toHaveBeenCalled();
});
