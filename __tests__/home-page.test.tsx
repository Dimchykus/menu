import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/page";

test("Page", async () => {
  render(await Page());
  expect(
    screen.getByRole("heading", { level: 2, name: "Why Choose Digital Menus" }),
  ).toBeDefined();
});
