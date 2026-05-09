import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

test("POST /api/calculate returns evaluated result", async () => {
  const response = await request(app)
    .post("/api/calculate")
    .send({ expression: "2+3*4", angleMode: "DEG" });

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.data.result, 14);
});

test("POST /api/calculate rejects empty expression", async () => {
  const response = await request(app).post("/api/calculate").send({ expression: "   " });
  assert.equal(response.statusCode, 400);
  assert.equal(response.body.error.code, "EMPTY_EXPRESSION");
});

test("POST /api/calculate handles negative sqrt as 422", async () => {
  const response = await request(app).post("/api/calculate").send({ expression: "sqrt(-1)" });
  assert.equal(response.statusCode, 422);
  assert.equal(response.body.error.code, "NEGATIVE_SQRT");
});

test("history endpoints use request session cookie", async () => {
  const agent = request.agent(app);
  await agent.post("/api/calculate").send({ expression: "10/2" });
  await agent.post("/api/calculate").send({ expression: "5+5" });

  const history = await agent.get("/api/history");
  assert.equal(history.statusCode, 200);
  assert.equal(history.body.data.items.length, 2);

  const cleared = await agent.delete("/api/history");
  assert.equal(cleared.statusCode, 200);
  assert.equal(cleared.body.data.cleared, true);
});
