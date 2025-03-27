import { Product } from '@prisma/client'
import prisma from '../config/prisma'
import { IProduct } from '../dto/product.dto'

export class ProductServise {
	public async createProduct(data: IProduct): Promise<Product> {
		const { name, price, description } = data
		const newProduct = prisma.product.create({
			data: { name, price, description },
		})
		return newProduct
	}

	public async getProdutcts(): Promise<Product[]> {
		const products = prisma.product.findMany({
			include: { orderProducts: true },
		})
		if (!products) {
			throw new Error('Products not found')
		}
		return products
	}

	public async getProductById(productId: string): Promise<Product | null> {
		const product = prisma.product.findUnique({
			where: { id: productId },
			include: { orderProducts: true },
		})
		if (!product) {
			throw new Error('Product not found')
		}
		return product
	}

	public async updateProduct(
		productId: string,
		data: Partial<IProduct>
	): Promise<Product | null> {
		const result = await prisma.product.update({
			where: { id: productId },
			data,
		})
		if (!result) {
			throw new Error('Product not find')
		}
		return result
	}

	public async deleteProduct(productId: string): Promise<Product | null> {
		const result = await prisma.product.delete({
			where: { id: productId },
		})
		if (!result) {
			throw new Error('Product not found')
		}
		return result
	}
}
