import { Router } from 'express'
import { BasketController } from '../controllers/basket.controller'

const router = Router()
const basketController = new BasketController()

router.get('/', basketController.getBasket)
router.post('/add', basketController.editItemQuantity)
router.get('/count', basketController.getBasketCount)
router.delete('/delete', basketController.deleteItem)
router.delete('/clear', basketController.clearBasket)

export default router
