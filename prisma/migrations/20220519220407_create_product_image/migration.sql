-- CreateTable
CREATE TABLE "products_image" (
    "id" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_product" TEXT NOT NULL,

    CONSTRAINT "products_image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products_image" ADD CONSTRAINT "products_image_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
