import test, { expect } from "@playwright/test";
import { AUTH_FILE_PATH } from "./utils";

test.describe("Profile", () => {
  test.use({ storageState: AUTH_FILE_PATH });

  test("Profile", async ({ page }) => {
    await page.goto("/profile");

    await expect(page.locator("[data-testid='profile-layout']")).toBeVisible();
  });
});
