import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockFetchHistory, mockPostCalculate } = vi.hoisted(() => ({
  mockFetchHistory: vi.fn(),
  mockPostCalculate: vi.fn()
}));

vi.mock("../services/api.js", () => ({
  fetchHistory: () => mockFetchHistory(),
  postCalculate: (expression, angleMode) => mockPostCalculate(expression, angleMode)
}));

import Calculator from "../components/Calculator.jsx";

describe("Calculator", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders history heading and mode toggle", async () => {
    mockFetchHistory.mockResolvedValue({ items: [] });

    render(<Calculator />);
    await waitFor(() => {
      expect(mockFetchHistory).toHaveBeenCalled();
    });
    expect(screen.getByText("History")).toBeTruthy();
    expect(screen.getByRole("button", { name: "DEG" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "RAD" })).toBeTruthy();
  });

  it("does not drop evaluate() history when fetchHistory resolves later with a stale snapshot", async () => {
    let resolveHistory;
    const historyPromise = new Promise((resolve) => {
      resolveHistory = resolve;
    });
    mockFetchHistory.mockReturnValue(historyPromise);
    mockPostCalculate.mockResolvedValue({
      result: 2,
      historyItem: {
        id: "new-calc-id",
        expression: "1+1",
        result: 2,
        timestamp: "2099-01-01T00:00:00.000Z"
      }
    });

    render(<Calculator />);

    fireEvent.click(screen.getByRole("button", { name: "1" }));
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    fireEvent.click(screen.getByRole("button", { name: "1" }));
    fireEvent.click(screen.getByRole("button", { name: "=" }));

    const historyAside = screen.getByRole("complementary");
    await waitFor(() => {
      expect(within(historyAside).getByText("1+1")).toBeTruthy();
    });

    resolveHistory({
      items: [
        {
          id: "stale-id",
          expression: "99",
          result: 99,
          timestamp: "2000-01-01T00:00:00.000Z"
        }
      ]
    });

    await waitFor(() => {
      expect(within(historyAside).getAllByRole("listitem")).toHaveLength(2);
    });
    expect(within(historyAside).getByText("1+1")).toBeTruthy();
    expect(within(historyAside).getAllByText("99").length).toBe(2);
  });
});
