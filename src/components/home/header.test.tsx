import { expect, test } from "vitest";
import Header from "./header";
import { render, screen } from "@testing-library/react";

test("Render Home header with no data", () => {
  render(<Header session={null} />);

  const header = screen.getByTestId("home-header");

  expect(header).toBeInTheDocument();

  const profile = screen.getByText("Login");
  expect(profile).toBeInTheDocument();
});

test("Render Home header with data", () => {
  render(
    <Header
      session={{
        expires: new Date().toISOString(),
        refreshToken: "123",
        id: 123,
        token: "123",
        user: {
          userId: 1,
          email: "test@test.com",
          name: "Test",
          image: "test.com",
          id: "123",
        },
      }}
    />,
  );

  const header = screen.getByTestId("home-header");

  expect(header).toBeInTheDocument();

  const profile = screen.getByText("Profile");
  expect(profile).toBeInTheDocument();
});
