import { expect, test, vi } from "vitest";
import SignupForm from ".";
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
  handleSignUp: vi.fn(),
}));

// vi.mock("next/link", () => ({
//   Link: ({ children }: { children: React.ReactNode }) => children,
// }));

global.ResizeObserver = class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
};

// // Mock the GitHubAuth component to prevent auth imports
// vi.mock("@/components/sso/github", () => ({
//   default: () => <button>GitHub</button>,
// }));

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

// test("Sign in form - invalid credentials", () => {
//   render(<SignupForm />);

//   expect(screen.getByText("Welcome Back")).toBeInTheDocument();

//   const emailInput = screen.getByPlaceholderText("Email Address");
//   const passwordInput = screen.getByPlaceholderText("Password");
//   const signInButton = screen.getByText("Sign In", { selector: "button" });

//   expect(emailInput).toBeInTheDocument();
//   expect(passwordInput).toBeInTheDocument();
//   expect(signInButton).toBeInTheDocument();

//   fireEvent.click(signInButton);

//   fireEvent.change(emailInput, { target: { value: "test@test.com" } });
//   fireEvent.change(passwordInput, { target: { value: "password" } });

//   expect(signInButton).toBeEnabled();

//   fireEvent.click(signInButton);
// });
