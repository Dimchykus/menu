import { expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";

test("renders tooltip with trigger and content", () => {
  render(
    <Tooltip>
      <TooltipTrigger>
        <span>Hover me</span>
      </TooltipTrigger>
      <TooltipContent>
        <p>Tooltip content</p>
      </TooltipContent>
    </Tooltip>,
  );

  const trigger = screen.getByRole("button", { name: "Hover me" });
  expect(trigger).toBeInTheDocument();
});

test("shows tooltip content when trigger is hovered", async () => {
  render(
    <Tooltip>
      <TooltipTrigger>
        <span>Hover me</span>
      </TooltipTrigger>
      <TooltipContent>
        <p>Tooltip content</p>
      </TooltipContent>
    </Tooltip>,
  );

  const trigger = screen.getByRole("button", { name: "Hover me" });

  fireEvent.mouseEnter(trigger);
  fireEvent.focus(trigger);

  const tooltipContents = await screen.findAllByText("Tooltip content");
  expect(tooltipContents.length).toBeGreaterThan(0);
});
