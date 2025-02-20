// src/components/screens/home/sections/candle.interface.tsx

export interface ICandle {
	id: number
	name: string
	price: number
	image: string
	description?: string // optional
}

export interface ICandleData {
	candles: ICandle[]
}
export interface ICandleDataSingle {
	candle: ICandle
}
