import { order_products } from '@prisma/client'
import prisma from '../config/prisma'
import { IOrder } from '../dto/order.dto'
import { basketServise } from './basket.serviсe'

export class orderService {
	private basketService: basketServise
	constructor() {
		this.basketService = new basketServise()
	}

	public async createOrder(userId: string): Promise<string> {
		const createOrder = await prisma.order.create({
			data: {
				userId: userId,
			},
		})
		if (!createOrder) {
			throw new Error('Error')
		}
		return createOrder.id
	}

	public async createOrderProduct(userId: string): Promise<void> {
		const isOrderExists = await prisma.order.findMany({
			where: {
				id: userId,
				status: false,
			},
		})
		if (isOrderExists.length < 0) {
			await this.createOrder(userId)
		}
		if (isOrderExists.length > 1) {
			await prisma.order.deleteMany({
				where: {
					userId: userId,
					status: false,
				},
			})
		}
		const basket = await this.basketService.getBasket(userId)

		if (!basket) {
			throw new Error('Error basket is empty')
		}

		const order = await prisma.order_products.createMany({
			data: basket.map(item => ({
				product_id: item.product_id,
				quantity: item.quantity,
				order_id: isOrderExists[0].id,
			})),
		})
		if (!order) {
			throw new Error('Error')
		}
	}

	public async getOrderHistory(userId: string): Promise<IOrder[]> {
		const order = await prisma.order.findMany({
			where: {
				userId: userId,
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
				userId: userId,
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
