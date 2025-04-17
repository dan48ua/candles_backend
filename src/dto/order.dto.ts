export interface IOrderItem {
	productId: string
	quantity: number
	price: number
	amount: number
}

export interface IOrder {
	userId: string
	status: boolean
}

export interface IOrderProduct {
	productId: string
	quantity: number
	orderId: string
}
