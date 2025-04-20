import { Request, Response } from 'express'
import { IProduct } from '../dto/product.dto'
import { ProductServise } from '../services/product.service'

export class ProductController {
	private productServise: ProductServise
	constructor() {
		this.productServise = new ProductServise()
	}

	public getAllProduct = async (req: Request, res: Response) => {
		try {
			const products = await this.productServise.getProdutcts()
			res.status(201).json({ message: 'All products', products })
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	}

	public getById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			const product = await this.productServise.getProductById(id)
			if (!product) {
				res.status(404).json({ message: 'Product underfind' })
			}
			res.status(201).json(product)
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	}

	public createProduct = async (req: Request, res: Response) => {
		try {
			const data: IProduct = req.body
			const product = await this.productServise.createProduct(data)
			res.status(201).json({ message: 'Product created', id: product.id })
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	}

	public updateProduct = async (req: Request, res: Response) => {
		try {
			const data: IProduct = req.body
			const { id } = req.params
			const result = await this.productServise.updateProduct(id, data)
			res.status(201).json({ message: 'Product updated', result })
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	}

	public deleteProduct = async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			const result = await this.productServise.deleteProduct(id)
			res.status(201).json({ message: 'Delete complete', result })
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	}
}
