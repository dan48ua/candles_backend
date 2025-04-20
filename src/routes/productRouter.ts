import { Router } from 'express'
import { upload } from '../config/multer'
import { ProductController } from '../controllers/product.controller'

const router = Router()
const productController = new ProductController()

router.get('/getAll', productController.getAllProduct)
router.get('/getById/:id', productController.getById)
router.post(
	'/debug/create',
	upload.single('image'),
	productController.createProduct
)
router.put(
	'/debug/update:id',
	upload.single('image'),
	productController.updateProduct
)
router.delete('/debug/delete:id', productController.deleteProduct)

export default router
