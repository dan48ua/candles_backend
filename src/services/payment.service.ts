import Stripe from 'stripe'
import { IPaymentDto } from '../dto/payment.dto'

export class PaymentService {
	private stripe: Stripe

	constructor() {
		this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
			apiVersion: '2025-03-31.basil',
		})
	}

	public async createIntent(data: IPaymentDto): Promise<Stripe.PaymentIntent> {
		const { currency, amount, metadata } = data
		if (amount <= 0) {
			throw new Error('Amount must be greater than 0')
		}
		const paymentIntent = await this.stripe.paymentIntents.create({
			amount,
			currency,
			metadata,
		})
		return paymentIntent
	}

	public async constructEvent(payload: Buffer, sig: string, secret: string) {
		return this.stripe.webhooks.constructEvent(payload, sig, secret)
	}

	public async getIntent(id: string): Promise<Stripe.PaymentIntent> {
		return this.stripe.paymentIntents.retrieve(id)
	}

	public async confirmIntent(id: string): Promise<Stripe.PaymentIntent> {
		return this.stripe.paymentIntents.confirm(id, {
			payment_method: 'pm_card_visa', // test card
			return_url: 'https://google.com',
		})
	}
}
