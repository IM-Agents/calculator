import { describe, expect, it } from "vitest";
import { formatDisplayValue } from "./formatDisplay.js";

describe("formatDisplayValue", () => {
  it("formats integers without trailing zeros", () => {
    expect(formatDisplayValue(42)).toBe("42");
  });

  it("trims trailing zeros from decimals", () => {
    expect(formatDisplayValue(1.5)).toBe("1.5");
  });

  it("normalizes negative zero", () => {
    expect(formatDisplayValue(-0)).toBe("0");
  });
});
