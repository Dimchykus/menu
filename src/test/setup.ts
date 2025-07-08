import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

vi.mock("embla-carousel-react", () => ({
  default: () => [
    (element: HTMLElement | null) => {},
    {
      canScrollPrev: () => false,
      canScrollNext: () => false,
      scrollPrev: () => {},
      scrollNext: () => {},
      on: () => {},
      off: () => {},
    },
  ],
}));
