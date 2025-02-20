import Layout from '@/components/layout/layout'
import { NextPage } from 'next'
import Banner from '../../layout/banner/banner'
import Description from './sections/description/description'

const Home: NextPage = () => {
	return (
		<>
			<Layout>
				<Banner />
				{/* <Catalogue /> */}
				<Description />
			</Layout>
		</>
	)
}

export default Home
