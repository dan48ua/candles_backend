import { Router } from 'express'
import { OrderController } from '../controllers/order.controller'

const router = Router()
const orderController = new OrderController()

router.post('/create', orderController.createOrder)
router.post('/checkout', orderController.checkout)
router.get('/history', orderController.getOrderHistory)
router.get('/current', orderController.getCurrentOrder)
router.get('/details/:orderId', orderController.getOrderDetails)

export default router
