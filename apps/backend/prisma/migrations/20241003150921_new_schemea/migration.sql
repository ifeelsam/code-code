-- CreateTable
CREATE TABLE "Problems" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "examples" TEXT NOT NULL,
    "testCases" TEXT,

    CONSTRAINT "Problems_pkey" PRIMARY KEY ("id")
);
