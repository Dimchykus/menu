import { test } from "@playwright/test";
import { AUTH_FILE_PATH } from "./utils";
import {
  generateRandomName,
  generateRandomEmail,
  generateRandomPassword,
} from "./utils/data";

test("Create user account and save auth state", async ({ page, context }) => {
  const name = generateRandomName();
  const email = generateRandomEmail();
  const password = generateRandomPassword();

  await page.goto("/signup");

  await page.fill("input[name='name']", name);
  await page.fill("input[name='email']", email);
  await page.fill("input[name='password']", password);
  await page.click("button[type='submit']");

  await page.waitForURL("/signin");

  await page.fill("input[name='email']", email);
  await page.fill("input[name='password']", password);
  await page.click("button[type='submit']");

  await page.waitForURL("/profile");

  await context.storageState({ path: AUTH_FILE_PATH });
});
