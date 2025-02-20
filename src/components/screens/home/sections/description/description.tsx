import Image from 'next/image'
import { FC } from 'react'
import style from './description.module.scss'

const Description: FC = () => {
	return (
		<section className={style.section}>
			{/* Just place the logo normally */}
			<Image
				src='logo.svg'
				alt='Zapaliu Candles Logo'
				width={105}
				height={105}
			/>

			<p className={style.text}>
				Zapaliu Candles is a brand ambassador of artisanal candle artistry
				worldwide. <br />
				Zapaliu Candles introduces the world to the beauty of handcrafted
				candles, where traditional techniques meet contemporary design. Each
				piece is created to illuminate your spaces with warmth, elegance, and a
				touch of magic. Every candle tells a story, weaving light and artistry
				into a timeless experience. With a commitment to quality and
				authenticity, Zapaliu Candles transforms everyday moments into
				unforgettable memories.
			</p>
		</section>
	)
}

export default Description
