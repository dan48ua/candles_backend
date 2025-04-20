import { product } from '@prisma/client'
import prisma from '../config/prisma'
import { IProduct } from '../dto/product.dto'

export class ProductServise {
	public async createProduct(data: IProduct): Promise<product> {
		const { name, price, weight, description, imageUrl } = data
		const newProduct = prisma.product.create({
			data: { name, price, description, weight, image_url: imageUrl },
		})
		return newProduct
	}

	public async getProdutcts(): Promise<product[]> {
		const products = prisma.product.findMany({
			// include: { order_products: true },
		})
		if (!products) {
			throw new Error('Products not found')
		}
		return products
	}

	public async getProductById(productId: string): Promise<product | null> {
		const product = prisma.product.findUnique({
			where: { id: productId },
			// include: { order_products: true },
		})
		if (!product) {
			throw new Error('Product not found')
		}
		return product
	}

	public async updateProduct(
		productId: string,
		data: Partial<IProduct>
	): Promise<product | null> {
		const result = await prisma.product.update({
			where: { id: productId },
			data,
		})
		if (!result) {
			throw new Error('Product not find')
		}
		return result
	}

	public async deleteProduct(productId: string): Promise<product | null> {
		const result = await prisma.product.delete({
			where: { id: productId },
		})
		if (!result) {
			throw new Error('Product not found')
		}
		return result
	}
}
