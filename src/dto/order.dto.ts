export interface IOrderItem {
	productId: string
	quantity: number
	price: number
	amount: number
}

export interface IOrder {
	items: IOrderItem[]
	userId: string
	amount: number
}
