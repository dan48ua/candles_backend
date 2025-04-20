export interface IPaymentDto {
	currency: string
	amount: number
	metadata?: { [key: string]: string }
}
