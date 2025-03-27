import { Router } from 'express'
import { ProductController } from '../controllers/product.controller'

const router = Router()
const productController = new ProductController()

router.post('/create', productController.createProduct)
router.get('/getAll', productController.getAllProduct)
router.get('/getById:id', productController.getById)
router.put('/update:id', productController.updateProduct)
router.delete('/delete:id', productController.deleteProduct)

export default router
