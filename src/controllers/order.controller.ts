import { Request, Response } from 'express'
import { orderService } from '../services/order.service'

export class OrderController {
	private orderService: orderService
	constructor() {
		this.orderService = new orderService()
	}

	public createOrder = async (req: Request, res: Response) => {
		// TODO: id should be from middleware
		try {
			const { userId } = req.body
			const orderId = await this.orderService.createOrder(userId)
			res.status(201).json({ message: 'Order created successfully', orderId })
		} catch (error: any) {
			res.status(500).json({ error: 'Error creating order' })
		}
	}

	public checkout = async (req: Request, res: Response) => {
		// TODO: add checkout
		// TODO: add clear basket if success
		// TODO: id shoud be from middleware
		try {
			const { userId, paymentIntentId } = req.body
			await this.orderService.checkout(userId, paymentIntentId)
			res.status(200).json({ message: 'Order link created successfully' })
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	}

	public getOrderHistory = async (req: Request, res: Response) => {
		// TODO: id shoud be from middleware
		try {
			const userId = req.body
			const orderHistory = await this.orderService.getOrderHistory(userId)
			res
				.status(201)
				.json({ message: 'Order history returned successfully', orderHistory })
		} catch (error: any) {
			res.status(500).json({ error: 'Error fetching order history' })
		}
	}

	public getCurrentOrder = async (req: Request, res: Response) => {
		// TODO: id shoud be from middleware
		try {
			const userId = req.body
			const currentOrder = await this.orderService.getCurrentOrder(userId)
			res
				.status(201)
				.json({ message: 'Current order returned successfully', currentOrder })
		} catch (error: any) {
			res.status(500).json({ error: 'Error fetching current order' })
		}
	}

	public getOrderDetails = async (req: Request, res: Response) => {
		// TODO: id shoud be from middleware
		try {
			const { id } = req.params
			const orderDetails = await this.orderService.getOrderDetails(id)
			res
				.status(201)
				.json({ message: 'Order details returned successfully', orderDetails })
		} catch (error: any) {
			res.status(500).json({ error: 'Error fetching order details' })
		}
	}
}
