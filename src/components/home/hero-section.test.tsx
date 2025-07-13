import { expect, test } from "vitest";
import HeroSection from "./hero-section";
import { render, screen } from "@testing-library/react";

test("Render HeroSection", () => {
  render(<HeroSection />);
});
