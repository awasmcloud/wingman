import { test, expect } from "vitest";
import { listMessages } from "./util";
import * as cloud from "../../src/cloud";
import { ApiAttributes } from "../../src/target-sim/schema-resources";
import { SimApp, Simulator, Testing } from "../../src/testing";

// Handler that responds to a request with a fixed string
const INFLIGHT_CODE = (body: string) =>
  `async handle(req) { return { status: 200, body: "${body}" }; }`;
// Handler that responds to a request with the request body
const INFLIGHT_CODE_ECHO_BODY = `async handle(req) { return { status: 200, body: req.body }; }`;
// Handler that responds to a request with the request method
const INFLIGHT_CODE_ECHO_METHOD = `async handle(req) { return { status: 200, body: req.method }; }`;
// Handler that responds to a request with the request path
const INFLIGHT_CODE_ECHO_PATH = `async handle(req) { return { status: 200, body: req.path }; }`;
// Handler that responds to a request with the request query params
const INFLIGHT_CODE_ECHO_QUERY = `async handle(req) { return { status: 200, body: req.query }; }`;
// Handler that responds to a request with extra response headers
const INFLIGHT_CODE_WITH_RESPONSE_HEADER = `async handle(req) { return { status: 200, body: req.headers, headers: { "x-wingnuts": "cloudy" } }; }`;

test("create an api", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Api._newApi(app, "my_api");

  // THEN
  const s = await app.startSimulator();
  expect(s.getResourceConfig("/my_api")).toEqual({
    attrs: {
      handle: expect.any(String),
      url: expect.any(String),
    },
    path: "root/my_api",
    props: {
      routes: [],
    },
    type: "wingsdk.cloud.Api",
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});

test("api with one GET route", async () => {
  // GIVEN
  const ROUTE = "/hello";
  const RESPONSE = "boom";

  const app = new SimApp();
  const api = cloud.Api._newApi(app, "my_api");
  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE(RESPONSE));
  api.get(ROUTE, inflight);

  // WHEN
  const s = await app.startSimulator();
  const apiUrl = getApiUrl(s, "/my_api");
  const response = await fetch(apiUrl + ROUTE, { method: "GET" });

  // THEN
  await s.stop();

  expect(response.status).toEqual(200);
  expect(await response.text()).toEqual(RESPONSE);

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("api with multiple GET routes and one lambda", () => {
  // GIVEN
  const app = new SimApp();
  const api = cloud.Api._newApi(app, "my_api");
  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE_ECHO_BODY);

  api.get("/hello/foo", inflight);
  api.get("/hello/bat", inflight);

  expect(app.snapshot()).toMatchSnapshot();
});

test("api supports every method type", async () => {
  // GIVEN
  const METHODS = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "HEAD",
    "OPTIONS",
    "PATCH",
    // "CONNECT",
    // CONNECT cannot be tested since JavaScript doesn't allow it:
    // https://stackoverflow.com/questions/58656378/is-it-possible-to-make-an-http-connect-request-with-javascript-in-a-browser
  ];
  const ROUTE = "/hello";

  const app = new SimApp();
  const api = cloud.Api._newApi(app, "my_api");
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    INFLIGHT_CODE_ECHO_METHOD
  );
  METHODS.forEach((method) => {
    api[method.toLowerCase()](ROUTE, inflight);
  });

  // WHEN
  const s = await app.startSimulator();
  const apiUrl = getApiUrl(s, "/my_api");
  const responses = await Promise.all(
    METHODS.map((method) => fetch(apiUrl + ROUTE, { method }))
  );

  // THEN
  await s.stop();

  await Promise.all(
    zip(METHODS, responses).map(async ([method, response]) => {
      expect(response.status).toEqual(200);
      expect(await response.text()).toEqual(method === "HEAD" ? "" : method);
    })
  );

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("api with multiple methods on same route", async () => {
  // GIVEN
  const ROUTE = "/hello";
  const GET_RESPONSE = "boom";
  const POST_RESPONSE = "bang";
  const app = new SimApp();
  const api = cloud.Api._newApi(app, "my_api");
  const inflightGet = Testing.makeHandler(
    app,
    "Handler1",
    INFLIGHT_CODE(GET_RESPONSE)
  );
  const inflightPost = Testing.makeHandler(
    app,
    "Handler2",
    INFLIGHT_CODE(POST_RESPONSE)
  );
  api.get(ROUTE, inflightGet);
  api.post(ROUTE, inflightPost);

  // WHEN
  const s = await app.startSimulator();
  const apiUrl = getApiUrl(s, "/my_api");
  const getResponse = await fetch(`${apiUrl}${ROUTE}`, { method: "GET" });
  const postResponse = await fetch(`${apiUrl}${ROUTE}`, { method: "POST" });

  // THEN
  await s.stop();

  expect(getResponse.status).toEqual(200);
  expect(await getResponse.text()).toEqual(GET_RESPONSE);

  expect(postResponse.status).toEqual(200);
  expect(await postResponse.text()).toEqual(POST_RESPONSE);

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("api with multiple routes", async () => {
  // GIVEN
  const ROUTE1 = "/hello/world";
  const ROUTE2 = "/hello/wingnuts";
  const RESPONSE1 = "boom";
  const RESPONSE2 = "bang";
  const app = new SimApp();
  const api = cloud.Api._newApi(app, "my_api");
  const inflight1 = Testing.makeHandler(
    app,
    "Handler1",
    INFLIGHT_CODE(RESPONSE1)
  );
  const inflight2 = Testing.makeHandler(
    app,
    "Handler2",
    INFLIGHT_CODE(RESPONSE2)
  );
  api.get(ROUTE1, inflight1);
  api.get(ROUTE2, inflight2);

  // WHEN
  const s = await app.startSimulator();
  const apiUrl = getApiUrl(s, "/my_api");
  const response1 = await fetch(`${apiUrl}${ROUTE1}`, { method: "GET" });
  const response2 = await fetch(`${apiUrl}${ROUTE2}`, { method: "GET" });

  // THEN
  await s.stop();

  expect(response1.status).toEqual(200);
  expect(await response1.text()).toEqual(RESPONSE1);

  expect(response2.status).toEqual(200);
  expect(await response2.text()).toEqual(RESPONSE2);

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("api with one POST route, with body", async () => {
  // GIVEN
  const ROUTE = "/hello";
  const REQUEST_BODY = { message: "hello world" };

  const app = new SimApp();
  const api = cloud.Api._newApi(app, "my_api");
  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE_ECHO_BODY);
  api.post(ROUTE, inflight);

  // WHEN
  const s = await app.startSimulator();
  const apiUrl = getApiUrl(s, "/my_api");
  const response = await fetch(apiUrl + ROUTE, {
    method: "POST",
    body: JSON.stringify(REQUEST_BODY),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // THEN
  await s.stop();

  expect(await response.json()).toEqual(REQUEST_BODY);
  expect(response.status).toEqual(200);

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("api handler can read the request path", async () => {
  // GIVEN
  const ROUTE = "/hello";

  const app = new SimApp();
  const api = cloud.Api._newApi(app, "my_api");
  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE_ECHO_PATH);
  api.get(ROUTE, inflight);

  // WHEN
  const s = await app.startSimulator();
  const apiUrl = getApiUrl(s, "/my_api");
  const response = await fetch(apiUrl + ROUTE, { method: "GET" });

  // THEN
  await s.stop();

  expect(response.status).toEqual(200);
  expect(await response.text()).toEqual(ROUTE);

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("api handler can read the request params", async () => {
  // GIVEN
  const ROUTE = "/hello";

  const app = new SimApp();
  const api = cloud.Api._newApi(app, "my_api");
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    INFLIGHT_CODE_ECHO_QUERY
  );
  api.get(ROUTE, inflight);

  // WHEN
  const s = await app.startSimulator();
  const apiUrl = getApiUrl(s, "/my_api");
  const response = await fetch(apiUrl + ROUTE + "?foo=bar&bar=baz", {
    method: "GET",
  });

  // THEN
  await s.stop();

  expect(response.status).toEqual(200);
  expect(await response.json()).toEqual({ foo: "bar", bar: "baz" });

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("api handler can set response headers", async () => {
  // GIVEN
  const ROUTE = "/hello";
  const REQUEST_HEADER_KEY = "foo";
  const REQUEST_HEADER_VALUE = "bar";

  const app = new SimApp();
  const api = cloud.Api._newApi(app, "my_api");
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    INFLIGHT_CODE_WITH_RESPONSE_HEADER
  );
  api.get(ROUTE, inflight);

  // WHEN
  const s = await app.startSimulator();
  const apiUrl = getApiUrl(s, "/my_api");
  const response = await fetch(apiUrl + ROUTE, {
    method: "GET",
    headers: {
      [REQUEST_HEADER_KEY]: REQUEST_HEADER_VALUE,
    },
  });

  // THEN
  await s.stop();

  expect(response.status).toEqual(200);
  const json = await response.json();
  expect(json[REQUEST_HEADER_KEY]).toEqual(REQUEST_HEADER_VALUE);

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

function getApiUrl(s: Simulator, path: string): string {
  const apiAttrs = s.getResourceConfig(path).attrs as ApiAttributes;
  return apiAttrs.url;
}

function zip<T, U>(a: T[], b: U[]): Array<[T, U]> {
  return a.map((x, i) => [x, b[i]]);
}