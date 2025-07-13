import { expect, test, vi } from "vitest";
import Layout from "./layout";
import { render, screen } from "@testing-library/react";

const MockPage = () => <div data-testid="mock-page">Mock Page Content</div>;

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({}),
}));

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: ({ children }: { children: React.ReactNode }) =>
    children,
}));

vi.mock("@/views/modals", () => ({
  default: () => null,
}));

test("Layout", async () => {
  render(
    <Layout>
      <MockPage />
    </Layout>,
  );

  expect(document.body).toBeDefined();

  expect(screen.getByTestId("mock-page")).toBeInTheDocument();
});
