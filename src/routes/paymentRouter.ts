import express, { Router } from 'express'
import { PaymentController } from '../controllers/payment.controller'

const router: Router = Router()
const paymentController = new PaymentController()

router.post('/create', paymentController.createPayment)
router.post(
	'/webhook',
	express.raw({ type: 'application/json' }),
	paymentController.webhook
)

export default router
