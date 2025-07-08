import { expect, test, vi } from "vitest";
import SigninForm from ".";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock the entire auth module to prevent next-auth from being loaded
vi.mock("@/lib/actions/auth", () => ({
  login: vi.fn(),
  signup: vi.fn(),
  logout: vi.fn(),
  getUser: vi.fn(),
}));

// Mock next-auth to prevent server-side imports
vi.mock("next-auth", () => ({
  default: vi.fn(),
}));

// Mock the auth configuration file
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

// vi.mock("next/link", () => ({
//   Link: ({ children }: { children: React.ReactNode }) => children,
// }));

// // Mock the GitHubAuth component to prevent auth imports
// vi.mock("@/components/sso/github", () => ({
//   default: () => <button>GitHub</button>,
// }));

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
