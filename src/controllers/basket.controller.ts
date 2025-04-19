import { basketServise } from '../services/basket.serviсe'

export class BasketController {
	private basketService: basketServise
	constructor() {
		this.basketService = new basketServise()
	}
}
