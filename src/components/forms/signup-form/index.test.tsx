import { expect, test, vi } from "vitest";
import SignupForm from ".";
import { fireEvent, render, screen } from "@testing-library/react";

vi.mock("@/lib/actions/auth", () => ({
  login: vi.fn(),
  signup: vi.fn(),
  logout: vi.fn(),
  getUser: vi.fn(),
}));

vi.mock("next-auth", () => ({
  default: vi.fn(),
}));

vi.mock("@/auth", () => ({
  auth: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
  handlers: {},
  unstable_update: vi.fn(),
}));

vi.mock("./actions", () => ({
  handleSignUp: vi.fn(),
}));

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

vi.mock("use-resize-observer", () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
}));

test("Signup form", () => {
  render(<SignupForm />);

  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "Create Account",
  );

  const nameInput = screen.getByPlaceholderText("Full Name");
  const emailInput = screen.getByPlaceholderText("Email Address");
  const passwordInput = screen.getByPlaceholderText("Password");
  const signInButton = screen.getByText("Sign In", { selector: "a" });
  const signUpButton = screen.getByText("Create Account", {
    selector: "button",
  });

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(signInButton).toBeInTheDocument();
  expect(signUpButton).toBeInTheDocument();

  fireEvent.change(nameInput, { target: { value: "John Doe" } });
  fireEvent.change(emailInput, { target: { value: "test@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });

  expect(signUpButton).toBeEnabled();

  fireEvent.click(signInButton);
});
