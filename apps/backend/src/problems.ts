import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();

router.post("/", async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const { title, description, examples } = req.body;
    const addProblem = await prisma.problems.create({
      data: {
        title,
        description,
        examples,
      },
    });
    res.json(addProblem);
  } catch (e) {
    console.log("error", e);
  }
});

router.get('/', async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const allProblems = await prisma.problems.findMany();
    res.json(allProblems);
  } catch (e) {
    console.log('error', e)
  }
})

router.put("/", async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const data = req.body;
    console.log(data)
    const updateProblem = await prisma.problems.update({
      where: { id: Number(data.id) },
      data: {
        title: data.title,
        description: data.description,
        examples: data.examples
      }
    })
    console.log(updateProblem)
    res.json(updateProblem)
  } catch (error) {
    console.log("error in updating problem", error)

  }
})

router.delete("/", async (req, res) => {
  const prisma = new PrismaClient()
  try {
    const { id } = req.body;
    const deleteProblem = await prisma.problems.delete({
      where: { id: Number(id) }
    })
    res.json(deleteProblem);

  } catch (e) {
    console.log("error deleting problems", e)
  }
})

export default router
