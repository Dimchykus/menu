/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { calculateSubscriptionEndDate } from "../subscription";

describe("calculateSubscriptionEndDate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T00:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should add 1 day for day duration", () => {
    const result = calculateSubscriptionEndDate("day");
    expect(result).toEqual(new Date("2024-01-02T00:00:00Z"));
  });

  it("should add 7 days for week duration", () => {
    const result = calculateSubscriptionEndDate("week");
    expect(result).toEqual(new Date("2024-01-08T00:00:00Z"));
  });

  it("should add 1 month for month duration", () => {
    const result = calculateSubscriptionEndDate("month");
    expect(result).toEqual(new Date("2024-02-01T00:00:00Z"));
  });

  it("should add 1 year for year duration", () => {
    const result = calculateSubscriptionEndDate("year");
    expect(result).toEqual(new Date("2025-01-01T00:00:00Z"));
  });

  it("should return null for invalid duration", () => {
    const result = calculateSubscriptionEndDate("invalid" as any);
    expect(result).toBeNull();
  });
});
