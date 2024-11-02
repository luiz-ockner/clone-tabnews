import orchestrator from "tests/orchestrator.js";

beforeAll( async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200",async() => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.dependencies.database.max_conn).toEqual(100);
  expect(responseBody.activity).toEqual(1);
  expect(responseBody.dependencies.database.version).toEqual("16.1");
    
  new Date(responseBody.updated_at).toISOString();

});