import { IProduct } from './product.dto'

export interface IBasket {
	id: string
	quantity: number
	amount: number
	item: IBasketItem[]
	userId: string
}

export interface IBasketItem {
	productId: string
	price: IProduct
	quantity: number
}
