import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

describe("calculator app", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders calculator layout", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: true, json: async () => ({ items: [] }) }))
    );

    render(<App />);
    expect(screen.getByText("History")).toBeInTheDocument();
    expect(screen.getByTestId("display-value")).toBeInTheDocument();
  });

  it("evaluates expression through api", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ items: [] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ result: 4 }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ items: [] }) });

    vi.stubGlobal("fetch", fetchMock);
    render(<App />);

    const twoButtons = screen.getAllByRole("button", { name: "2" });
    fireEvent.click(twoButtons[0]);
    fireEvent.click(screen.getAllByRole("button", { name: "+" })[0]);
    fireEvent.click(twoButtons[0]);
    fireEvent.click(screen.getByRole("button", { name: "=" }));

    await waitFor(() => expect(screen.getByTestId("display-value")).toHaveTextContent("4"));
  });
});
