/*
  Warnings:

  - You are about to drop the column `role_type` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "role_type";

-- DropEnum
DROP TYPE "Role_type";
