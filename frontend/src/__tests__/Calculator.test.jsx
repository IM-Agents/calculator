import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Calculator from "../components/Calculator.jsx";

describe("Calculator", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders history heading and mode toggle", () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      json: async () => ({ success: true, data: { items: [] } })
    });

    render(<Calculator />);
    expect(screen.getByText("History")).toBeTruthy();
    expect(screen.getByRole("button", { name: "DEG" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "RAD" })).toBeTruthy();
  });
});
