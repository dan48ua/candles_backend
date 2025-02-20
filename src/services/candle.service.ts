import { ICandle } from '@/interfaces/candle.interface'
import axios from 'axios'

const API_URL = 'http://localhost:4200'
axios.defaults.baseURL = API_URL

export const getCandles = {
	async getAll() {
		console.log('qwe')
		const { data } = await axios.get<ICandle[]>('/')
		return data
	},
	async getById(id: string) {
		console.log('ewq')
		const { data } = await axios.get<ICandle[]>(`/${id}`)
		return data[0]
	},
}
