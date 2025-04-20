import { Request, Response } from 'express'
import { IPaymentDto } from '../dto/payment.dto'
import { PaymentService } from '../services/payment.service'

export class PaymentController {
	private paymentService: PaymentService

	constructor() {
		this.paymentService = new PaymentService()
	}

	public createPayment = async (req: Request, res: Response) => {
		try {
			const dto = req.body as IPaymentDto
			const intent = await this.paymentService.createIntent(dto)
			res
				.status(200)
				.json({
					paymentIntentId: intent.id,
					clientSecret: intent.client_secret,
				})
		} catch (e: any) {
			res.status(400).json({ message: e.message })
		}
	}

	public webhook = async (req: Request, res: Response) => {
		const sig = req.headers['stripe-signature'] as string
		try {
			const event = await this.paymentService.constructEvent(
				req.body as Buffer,
				sig,
				process.env.STRIPE_WEBHOOK_SECRET!
			)
			if (event.type === 'payment_intent.succeeded') {
				// TODO: подтвер­дить заказ
			}
			res.sendStatus(200)
		} catch (e: any) {
			res.status(400).send('Invalid webhook')
		}
	}
}
