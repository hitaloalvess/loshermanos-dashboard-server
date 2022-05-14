-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "name_stablishment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);
