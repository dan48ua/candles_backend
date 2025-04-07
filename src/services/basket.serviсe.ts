import { basket } from '@prisma/client'
import prisma from '../config/prisma'

type CartItem = basket
export class basketServise {
	public async add(
		userId: string,
		productId: string,
		quantity: number
	): Promise<CartItem> {
		if (quantity < 0) {
			throw new Error('Not valid quantity')
		}
		const existingProduct = await prisma.basket.findFirst({
			where: {
				product_id: productId,
				user_id: userId,
			},
		})
		const product = await prisma.product.findUnique({
			where: {
				id: productId,
			},
		})
		if (existingProduct) {
			const existingQuantity = existingProduct.quantity
			const updateItem = await prisma.basket.update({
				where: { id: existingProduct.id },
				data: { quantity: quantity + existingQuantity },
			})
			return updateItem
		}
		if (!product?.price) {
			throw new Error('Invalid price data')
		}
		const createItem = await prisma.basket.create({
			data: {
				user_id: userId,
				product_id: productId,
				quantity: quantity,
				amount: product?.price * quantity,
			},
		})
		return createItem
	}
}
