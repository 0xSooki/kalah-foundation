import { FC } from 'react'
import Kalah from '@/components/games/Kalah'
import Header from '@/components/header/Header'

const Home: FC = () => {
	return (
		<>
			<div className="flex flex-col min-h-screen bg-light dark:bg-dark items-center justify-center py-2">
				<Kalah slug="1" />
			</div>
		</>
	)
}

export default Home
