-- CreateTable
CREATE TABLE "ratins" (
    "id" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "desc" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ratins_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ratins" ADD CONSTRAINT "ratins_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratins" ADD CONSTRAINT "ratins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
