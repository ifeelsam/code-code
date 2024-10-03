import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router()

router.get("/", async (req, res) => {
  const prisma = new PrismaClient();

  try {

  } catch (error) {
    console.log("get req error for submission", error)
  }


})

export default router 
