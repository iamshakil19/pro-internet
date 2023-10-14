/*
  Warnings:

  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('super_admin', 'admin', 'user');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "access" BOOLEAN DEFAULT true,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" DEFAULT 'user',
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "image" SET DEFAULT '';
