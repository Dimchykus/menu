import { test } from "vitest";
import { render } from "@testing-library/react";
import Page from "./page";

test("Render Profile Page", () => {
  render(<Page />);
});
