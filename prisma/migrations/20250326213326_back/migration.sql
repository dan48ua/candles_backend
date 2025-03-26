-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_orderProductsId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "orderProductsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_orderProductsId_fkey" FOREIGN KEY ("orderProductsId") REFERENCES "order_products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
