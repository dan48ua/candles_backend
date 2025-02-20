// src/components/screens/home/sections/candles.tsx

import { ICandleDataSingle } from '@/interfaces/candle.interface'
import React from 'react'

const CandleCard: React.FC<ICandleDataSingle> = ({ candle }) => {
	return (
		<div
			style={{
				width: 280,
				margin: 10,
				border: '1px solid #ccc',
				textAlign: 'center',
				display: 'grid',
				gridColumn: '1fr 1fr 1fr',
			}}
		>
			<img
				src={candle.image}
				alt={candle.name}
				style={{ width: '280px', height: '280px' }}
			/>
			<h2>{candle.name}</h2>
			<p>{candle.price}&#8372;</p>
			{/* You can add a link/button for more details */}
			<button>More Info</button>
		</div>
	)
}

export default CandleCard
