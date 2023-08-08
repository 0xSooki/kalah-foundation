import { FC } from 'react'
import Kalah from '@/components/games/Kalah'
import Header from '@/components/header/Header'

const Home: FC = () => {
	return (
		<>
			<div className="bg-light dark:bg-dark w-full sm:items-center py-4 sm:pt-0">
				<Header />
				<div className="flex flex-col items-center text-3xl dark:text-light text-dark justify-center min-h-screen py-2">
					<h1>Page not found</h1>
				</div>
			</div>
		</>
	)
}

export default Home
