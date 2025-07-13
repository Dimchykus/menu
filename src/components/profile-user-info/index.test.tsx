import { test, vi } from "vitest";
import { render } from "@testing-library/react";
import ProfileUserInfo from "./index";
import { ModalProvider } from "@/context/modals";

vi.mock("@/lib/actions/auth", () => ({
  getUser: vi.fn().mockResolvedValue({
    name: "John Doe",
    email: "john@example.com",
    userId: 1,
  }),
}));

vi.mock("./actions", () => ({
  handleUpdateUserInfo: vi.fn(),
}));

test("Render ProfileUserInfo", async () => {
  render(
    <ModalProvider>
      <ProfileUserInfo />
    </ModalProvider>,
  );
});
