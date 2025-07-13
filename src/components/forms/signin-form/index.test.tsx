import { expect, test, vi } from "vitest";
import SigninForm from ".";
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
  handleSignIn: vi.fn(),
}));

test("Sign in form", () => {
  render(<SigninForm />);

  expect(screen.getByText("Welcome Back")).toBeInTheDocument();

  const emailInput = screen.getByPlaceholderText("Email Address");
  const passwordInput = screen.getByPlaceholderText("Password");
  const signInButton = screen.getByText("Sign In", { selector: "button" });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(signInButton).toBeInTheDocument();

  fireEvent.change(emailInput, { target: { value: "test@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });

  expect(signInButton).toBeEnabled();

  fireEvent.click(signInButton);
});

test("Sign in form - invalid credentials", () => {
  render(<SigninForm />);

  expect(screen.getByText("Welcome Back")).toBeInTheDocument();

  const emailInput = screen.getByPlaceholderText("Email Address");
  const passwordInput = screen.getByPlaceholderText("Password");
  const signInButton = screen.getByText("Sign In", { selector: "button" });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(signInButton).toBeInTheDocument();

  fireEvent.click(signInButton);

  fireEvent.change(emailInput, { target: { value: "test@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });

  expect(signInButton).toBeEnabled();

  fireEvent.click(signInButton);
});
