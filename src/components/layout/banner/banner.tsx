import Image from 'next/image'
import { FC } from 'react'
import style from './banner.module.scss'

const Background: FC = () => {
	return (
		<section className={style.backgroundSection}>
			<Image
				className={style.backgroundImg}
				alt='background'
				src='/backImg.svg'
				quality={100}
				fill
				sizes='100%'
				style={{ objectFit: 'cover', objectPosition: 'center' }}
				priority
			/>

			<div className={style.textWrapper}>
				<h1 className={style.headline}>
					LIGHT UP YOUR
					<br />
					MOMENTS
					<br />
					WITH WARMTH AND
					<br />
					ELEGANCE
				</h1>
			</div>

			<div className={style.candleContainer}>
				<Image
					className={style.candleImg}
					alt='candle'
					src='/CandleImg.svg'
					fill
					sizes='100%'
					style={{ objectFit: 'contain' }}
					priority
				/>
			</div>
		</section>
	)
}

export default Background
