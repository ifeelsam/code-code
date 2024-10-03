import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hellow world");
});

app.post("/problem", async (req, res) => {
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

app.get('/problem', async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const allProblems = await prisma.problems.findMany();
    res.json(allProblems);
  } catch (e) {
    console.log('error', e)
  }
})

app.put("/problem", async (req, res) => {
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

app.delete("/problem", async (req, res) => {
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

app.listen(3002, () => {
  try {
    console.log("here it is http://localhost:3002/");
  } catch (e) {
    console.log(e);
  }
});
