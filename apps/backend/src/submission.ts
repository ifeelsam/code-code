import express from "express";
import { getSubmission } from "./functions.js";
import { PrismaClient } from "@prisma/client";

const app = express.Router()

app.get("/:id", async (req, res) => {
  try {
    const subId = req.params.id
    const submission = await getSubmission(parseInt(subId));
    res.send(submission)
  } catch (error) {
    console.log("get req error for submission", error)
  }
})

app.post("/", async (req, res) => {

  const prisma = new PrismaClient()
  try {
    const { code, problemId, language, status, problem } = req.body;
    console.log(req.body)
    const newSubmmision = await prisma.submission.create({
      data: {
        problemId,
        code,
        language,
        status,
        problem,
      }
    })
    res.json(newSubmmision)

  } catch (error) {
    console.log("error adding subimmison", error)
  }

})

export default app
