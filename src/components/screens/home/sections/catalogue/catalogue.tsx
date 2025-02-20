// src/components/screens/home/sections/catalogue.tsx

import { ICandleData } from '@/interfaces/candle.interface'
import React from 'react'
import CandleCard from './candle/candle'

const Catalogue: React.FC<ICandleData> = ({ candles }) => {
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			{candles.map(candle => (
				<CandleCard key={candle.id} candle={candle} />
			))}
		</div>
	)
}

export default Catalogue
