-- CreateEnum
CREATE TYPE "Role_type" AS ENUM ('USER', 'ADMIN', 'SUPERADMIN');

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "role_type" "Role_type" NOT NULL DEFAULT E'USER';
