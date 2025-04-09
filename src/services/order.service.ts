import prisma from 'config/prisma'
import { IOrder } from '../dto/order.dto'
import { basketServise } from './basket.serviсe'

export class orderService {
	private basketService: basketServise
	constructor() {
		this.basketService = new basketServise()
	}

	public async createOrder(userId: string, orderData: IOrder): Promise<IOrder> {
		const order = await this.basketService.getBasket(userId)
		if (!order) {
			throw new Error('Basket not found')
		}
		if (order.length === 0) {
			throw new Error('Basket is empty')
		}
		const totalPrice = 0
		for (const item of order) {
			totalPrice +- item.amount 
		}
		const newOrder = await prisma.order.create({
			data: {
				userId: userId, 
				amount: totalPrice,
				items: {
					create: order.map((item) => ({
						productId: item.product_id,
						quantity: item.quantity,
						amount: item.amount,
					})),
				}
			}
		})
		if (!newOrder) {
			throw new Error('Error creating order')
		}
		return newOrder
	}
}
