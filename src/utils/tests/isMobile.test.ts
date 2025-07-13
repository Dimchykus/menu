/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, vi } from "vitest";
import { isMobileDevice } from "../isMobile";

vi.mock("next/headers", () => ({
  headers: vi.fn(),
}));

vi.mock("ua-parser-js", () => ({
  UAParser: vi.fn(),
}));

describe("isMobileDevice", () => {
  it("should return true for mobile user agent", async () => {
    const { headers } = await import("next/headers");
    const { UAParser } = await import("ua-parser-js");

    const mockHeaders = {
      get: vi
        .fn()
        .mockReturnValue(
          "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)",
        ),
    };

    const mockUAParser = {
      getDevice: vi.fn().mockReturnValue({ type: "mobile" }),
    };

    (headers as any).mockResolvedValue(mockHeaders);
    (UAParser as any).mockImplementation(() => mockUAParser);

    const result = await isMobileDevice();
    expect(result).toBe(true);
  });
});
