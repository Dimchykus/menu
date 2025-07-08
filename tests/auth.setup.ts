import { test } from "@playwright/test";
import { AUTH_FILE_PATH } from "./utils";
import {
  generateRandomName,
  generateRandomEmail,
  generateRandomPassword,
} from "./utils/data";

test("Create user account and save auth state", async ({ page, context }) => {
  // Generate user credentials to use for both signup and signin
  const name = generateRandomName();
  const email = generateRandomEmail();
  const password = generateRandomPassword();

  // Step 1: Sign up
  await page.goto("/signup");

  await page.fill("input[name='name']", name);
  await page.fill("input[name='email']", email);
  await page.fill("input[name='password']", password);
  await page.click("button[type='submit']");

  // Wait for redirect to signin page after successful signup
  await page.waitForURL("/signin");

  // Step 2: Sign in with the same credentials
  await page.fill("input[name='email']", email);
  await page.fill("input[name='password']", password);
  await page.click("button[type='submit']");

  // Wait for redirect to homepage after successful signin
  await page.waitForURL("/profile");

  // Step 3: Save the authenticated session state
  await context.storageState({ path: AUTH_FILE_PATH });
});
