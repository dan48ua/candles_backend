import Link from 'next/link'
import { FC } from 'react'
import style from './header.module.scss'

const Header: FC = () => {
	return (
		<header className={style.header}>
			<h1 className={style.siteTitle}>
				<Link href='/'>ZAPALIUI CANDLES</Link>
			</h1>
			<div className={style.navRow}>
				<div className={style.left}>
					<Link href='./' className={style.link}>
						Sign In
					</Link>
				</div>
				<div className={style.right}>
					<nav>
						<ul className={style.navList}>
							<li>
								<Link href='/about' className={style.link}>
									About Us
								</Link>
							</li>
							<li>
								<Link href='/' className={style.link}>
									Contacts
								</Link>
							</li>
							<li>
								<Link href='/' className={style.link}>
									Basket
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	)
}

export default Header
