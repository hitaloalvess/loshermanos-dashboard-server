/*
  Warnings:

  - You are about to drop the column `id_role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_id_account_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_id_role_fkey";

-- AlterTable
ALTER TABLE "sale_products" ALTER COLUMN "amount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "id_role";

-- DropTable
DROP TABLE "roles";
