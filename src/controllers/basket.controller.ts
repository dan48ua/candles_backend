import { Request, Response } from 'express'
import { IBasketItem } from '../dto/basket.dto'
import { basketServise } from '../services/basket.serviсe'

export class BasketController {
	private basketService: basketServise
	constructor() {
		this.basketService = new basketServise()
	}

	public editItemQuantity = async (req: Request, res: Response) => {
		try {
			const data: IBasketItem = req.body
			const newItem = await this.basketService.editItemQuantity(data)
			res
				.status(201)
				.json({ message: 'Item added to basket', quantity: newItem })
		} catch (error: any) {
			res.status(400).json({ message: error.message })
		}
	}

	public getBasketCount = async (req: Request, res: Response) => {
		try {
			const { userId } = req.body
			const totalCount = await this.basketService.getBasketCount(userId)
			res.status(201).json({ totalCount })
		} catch (error: any) {
			res.status(400).json({ message: error.message })
		}
	}

	public getBasket = async (req: Request, res: Response) => {
		try {
			const userId = req.query.userId as string
			// console.log('req.query:', req.query)
			// console.log('userId', userId)
			const allItems = await this.basketService.getBasket(userId)
			res.status(201).json({ allItems })
		} catch (error: any) {
			res.status(400).json({ message: error.message })
		}
	}

	public deleteItem = async (req: Request, res: Response) => {
		try {
			const { userId, productId } = req.body
			const deletedItem = await this.basketService.deleteItem(userId, productId)
			res.status(201).json({ message: 'Item deleted', deletedItem })
		} catch (error: any) {
			res.status(400).json({ message: error.message })
		}
	}

	public clearBasket = async (req: Request, res: Response) => {
		try {
			const { userId } = req.body
			const deletedItem = await this.basketService.clearBasket(userId)
			res.status(201).json({ message: 'Basket cleared', deletedItem })
		} catch (error: any) {
			res.status(400).json({ message: error.message })
		}
	}
}
