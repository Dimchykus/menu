import { expect, test, vi } from "vitest";
import Layout from "./layout";
import { render, screen } from "@testing-library/react";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({}),
}));

// Can't render server components in tests
vi.mock("@/components/header", () => ({
  default: () => <div data-testid="mock-header">Mock Header</div>,
}));

const MockPage = () => <div data-testid="mock-page">Mock Page Content</div>;

test("Restaurants Layout", async () => {
  render(
    <Layout>
      <MockPage />
    </Layout>,
  );

  expect(screen.getByTestId("mock-page")).toBeInTheDocument();
  expect(screen.getByTestId("mock-header")).toBeInTheDocument();
});
