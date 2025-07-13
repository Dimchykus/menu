import { describe, it, expect } from "vitest";
import { capitalizeFirstLetter } from "../text";

describe("capitalizeFirstLetter", () => {
  it("should capitalize the first letter of a string", () => {
    const result = capitalizeFirstLetter("hello");
    expect(result).toBe("Hello");
  });

  it("should handle empty string", () => {
    const result = capitalizeFirstLetter("");
    expect(result).toBe("");
  });

  it("should handle single character", () => {
    const result = capitalizeFirstLetter("a");
    expect(result).toBe("A");
  });

  it("should handle already capitalized string", () => {
    const result = capitalizeFirstLetter("Hello");
    expect(result).toBe("Hello");
  });

  it("should handle string with numbers", () => {
    const result = capitalizeFirstLetter("123abc");
    expect(result).toBe("123abc");
  });
});
