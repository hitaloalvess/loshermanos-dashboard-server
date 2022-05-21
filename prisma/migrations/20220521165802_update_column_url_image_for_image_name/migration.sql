/*
  Warnings:

  - You are about to drop the column `url_image` on the `products` table. All the data in the column will be lost.
  - Added the required column `image_name` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "url_image",
ADD COLUMN     "image_name" TEXT NOT NULL;
