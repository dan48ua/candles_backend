import { basket } from '@prisma/client'
import prisma from '../config/prisma'
import { IBasketItem } from '../dto/basket.dto'

type CartItem = basket
export class basketServise {
	public async editItemQuantity(data: IBasketItem): Promise<number> {
		const { userId, productId, quantity } = data
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
			if (updateItem.quantity <= 0) {
				this.deleteItem(userId, productId)
			}
			return updateItem.quantity
		}
		if (!product?.price) {
			throw new Error('Invalid price data')
		}
		const createItem = await prisma.basket.create({
			data: {
				user_id: userId,
				product_id: productId,
				quantity: quantity,
			},
		})
		return createItem.quantity
	}

	public async getBasket(userId: string): Promise<CartItem[]> {
		const allItems = await prisma.basket.findMany({
			where: {
				user_id: userId,
			},
			include: {
				product: true,
			},
		})
		if (!allItems) {
			throw new Error('Basket is empty')
		}
		if (allItems.length <= 0) {
			throw new Error('Basket is empty')
		}
		return allItems
	}

	public async deleteItem(userId: string, productId: string): Promise<boolean> {
		const deleteItem = await prisma.basket.deleteMany({
			where: {
				user_id: userId,
				product_id: productId,
			},
		})
		if (!deleteItem) {
			throw new Error()
			return false
		}
		return true
	}

	public async clearBasket(userId: string): Promise<void> {
		const clearBasket = await prisma.basket.deleteMany({
			where: {
				user_id: userId,
			},
		})
	}
}
