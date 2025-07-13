import { expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ThemeDropdownButton from "./drop-down-button";
import { DropdownMenu, DropdownMenuContent } from "../ui/dropdown-menu";
import { ThemeProvider } from "../../lib/providers/theme";

test("Theme Dropdown Button", async () => {
  render(
    <ThemeProvider attribute="class" defaultTheme="light">
      <DropdownMenu open>
        <DropdownMenuContent>
          <ThemeDropdownButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </ThemeProvider>,
  );

  const button = screen.getByText("Theme");

  expect(button).toBeInTheDocument();

  fireEvent.click(button);
});
