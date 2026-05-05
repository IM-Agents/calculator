import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../src/app.js";

describe("calculator api", () => {
  it("evaluates expressions and stores history by session", async () => {
    const agent = request.agent(app);

    const calcResponse = await agent.post("/api/calculate").send({ expression: "2+3*4" });
    expect(calcResponse.status).toBe(200);
    expect(calcResponse.body.result).toBe(14);

    const historyResponse = await agent.get("/api/history");
    expect(historyResponse.status).toBe(200);
    expect(historyResponse.body.items).toHaveLength(1);
    expect(historyResponse.body.items[0].expression).toBe("2+3*4");
  });

  it("returns EMPTY_EXPRESSION for blank values", async () => {
    const response = await request(app).post("/api/calculate").send({ expression: "   " });
    expect(response.status).toBe(400);
    expect(response.body.code).toBe("EMPTY_EXPRESSION");
  });

  it("supports trigonometric mode", async () => {
    const response = await request(app).post("/api/calculate").send({ expression: "sin(90)", angleMode: "DEG" });
    expect(response.status).toBe(200);
    expect(Math.round(response.body.result)).toBe(1);
  });
});
