import { product } from '@prisma/client'
import prisma from '../config/prisma'
import { IProduct } from '../dto/product.dto'

export class ProductServise {
	public async createProduct(data: IProduct): Promise<product> {
		const { name, price, weight, description, imageUrl } = data
		const newProduct = await prisma.product.create({
			data: { name, price, description, weight, image_url: imageUrl },
		})
		return newProduct
	}

	public async getProdutcts(): Promise<product[]> {
		const products = await prisma.product.findMany({
			// include: { order_products: true },
		})
		if (!products || products.length === 0) {
			throw new Error('Products not found')
		}
		return products
	}

	public async getProductById(productId: string): Promise<product | null> {
		const product = await prisma.product.findUnique({
			where: { id: productId },
		})
		if (!product) {
			throw new Error('Product not found')
		}
		// console.log('Product Name:', product?.name)
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
