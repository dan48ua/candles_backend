import { Product } from '@prisma/client'
import prisma from '../config/prisma'
import { IProduct } from '../dto/product.dto'

export class ProductServise {
	public async createProduct(data: IProduct): Promise<Product> {
		return prisma.product.create({ data })
	}

	public async getProdutcts(): Promise<Product[]> {
		return prisma.product.findMany({
			include: { orderProducts: true },
		})
	}

	public async getProductById(productId: string): Promise<Product | null> {
		return prisma.product.findUnique({
			where: { id: productId },
			include: { orderProducts: true },
		})
	}

	public async updateProduct(
		productId: string,
		data: Partial<IProduct>
	): Promise<Product | null> {
		try {
			return await prisma.product.update({
				where: { id: productId },
				data,
			})
		} catch (error: any) {
			return null
		}
	}

	public async deleteProduct(productId: string): Promise<Product | null> {
		try {
			return await prisma.product.delete({
				where: { id: productId },
			})
		} catch (error) {
			return null
		}
	}
}
