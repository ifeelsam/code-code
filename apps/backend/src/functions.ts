import { PrismaClient } from "@prisma/client"

export const getSubmission = async (id: number) => {
  const prisma = new PrismaClient();

  const submission = await prisma.submission.findUnique({
    where: { id: id },
    include: {
      problem: true
    }
  })
  if (!submission) {
    throw new Error('submission not found')
  }
  return submission
}

