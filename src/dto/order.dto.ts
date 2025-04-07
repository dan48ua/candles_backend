export interface IOrderItem {
	productId: string
	quantity: number
	price: number
	amount: number
}

export interface IOrder {
	userId: string
	items: IOrderItem[]
	amount: number
}
