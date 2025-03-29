import { IBasket } from '../dto/basket.dto'

export class basketServise {
	public async add(data: IBasket) {
		const { id, quantity, amount, productId, userId } = data
	}
}
