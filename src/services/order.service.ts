import { order_products } from '@prisma/client'
import prisma from '../config/prisma'
import { IOrder } from '../dto/order.dto'
import { basketServise } from './basket.serviсe'
import { PaymentService } from './payment.service'

export class orderService {
	private basketService: basketServise
	private paymentService: PaymentService
	constructor() {
		this.basketService = new basketServise()
		this.paymentService = new PaymentService()
	}

	public async createOrder(userId: string): Promise<string> {
		const createOrder = await prisma.order.create({
			data: {
				user_id: userId,
				status: false,
			},
		})
		if (!createOrder) {
			throw new Error('Error')
		}
		return createOrder.id
	}

	public async checkout(
		userId: string,
		paymentIntentId: string
	): Promise<void> {
		await this.paymentService.confirmIntent(paymentIntentId)
		const intent = await this.paymentService.getIntent(paymentIntentId)
		if (intent.status !== 'succeeded') throw new Error('Платёж не завершён')

		let orderr = await prisma.order.findFirst({
			where: { user_id: userId, status: false },
		})

		if (!orderr) {
			orderr = await prisma.order.create({
				data: { user_id: userId, status: false },
			})
		}
		const basket = await prisma.basket.findMany({
			where: { user_id: userId },
		})
		if (basket.length == 0) {
			throw new Error('Корзина пуста')
		}

		await prisma.order_products.createMany({
			data: basket.map(item => ({
				order_id: orderr!.id,
				product_id: item.product_id,
				quantity: item.quantity,
			})),
		})

		await prisma.order.update({
			where: { id: orderr.id },
			data: { status: true },
		})

		await this.basketService.clearBasket(userId)
	}

	public async getOrderHistory(userId: string): Promise<IOrder[]> {
		const order = await prisma.order.findMany({
			where: {
				user_id: userId,
				status: true,
			},
		})
		if (!order) {
			throw new Error('Error')
		}
		return order
	}

	public async getCurrentOrder(userId: string): Promise<IOrder> {
		const order = await prisma.order.findFirst({
			where: {
				user_id: userId,
				status: false,
			},
		})
		if (!order) {
			throw new Error('Error')
		}
		return order
	}

	public async getOrderDetails(orderId: string): Promise<order_products[]> {
		const orderDetails = await prisma.order_products.findMany({
			where: {
				order_id: orderId,
			},
		})
		if (!orderDetails) {
			throw new Error('Error')
		}
		return orderDetails
	}
}
