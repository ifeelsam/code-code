import { Router } from "express";
import piston from "piston-client";
const app = Router();

app.get("/", async (req, res) => {
  const { id, language, code } = req.body;
  const client = piston()
  const result = await client.execute(language, code, { language: '3.9.4 ' })
  console.log(result)
  res.json(result)
})

export default app
