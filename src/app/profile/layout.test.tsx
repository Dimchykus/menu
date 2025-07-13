import { test, vi } from "vitest";
import { render } from "@testing-library/react";
import Layout from "./layout";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({
    user: {
      id: "1",
      name: "Test User",
      email: "test@example.com",
    },
  }),
}));


test("Render Profile Layout", () => {
  render(
    <Layout>
      <div>Test Content</div>
    </Layout>,
  );
});
