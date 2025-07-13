import { test } from "vitest";
import HeroSection from "./hero-section";
import { render } from "@testing-library/react";

test("Render HeroSection", () => {
  render(<HeroSection />);
});
