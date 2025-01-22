-- CreateTable
CREATE TABLE "product" (
    "id_product" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iva" DOUBLE PRECISION NOT NULL,
    "mark" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "percentage_increment" DOUBLE PRECISION NOT NULL,
    "public_price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "supplier_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id_product")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_code_key" ON "product"("code");
