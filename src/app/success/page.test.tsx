import { test, vi } from "vitest";
import Success from "./page";
import { render } from "@testing-library/react";
import { handleSaveSubscription } from "./actions";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue(null),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("./actions", () => ({
  handleSaveSubscription: vi.fn().mockResolvedValue({
    notFound: false,
  }),
}));

test("Success page", async () => {
  render(
    <Success
      searchParams={Promise.resolve({ session_id: "1", planId: "1" })}
    />,
  );
});

test("Success page with invalid session", async () => {
  vi.mocked(handleSaveSubscription).mockResolvedValue({
    notFound: true,
  });

  render(
    <Success
      searchParams={Promise.resolve({ session_id: "1", planId: "1" })}
    />,
  );
});
