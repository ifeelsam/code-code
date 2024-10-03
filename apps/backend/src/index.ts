import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("hellow"))

export default {
  port: 3002,
  fetch: app.fetch
}
