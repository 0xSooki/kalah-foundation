import Header from '@/components/shared/Header'
import { FC } from 'react'
import Lock from '@/components/Lock'

const Home: FC = () => {
	return (
		<>
			<Header />
			<div className="relative flex items-top justify-center min-h-screen bg-gray-300 dark:bg-gray-700 sm:items-center py-4 sm:pt-0">
				<div className="flex flex-col items-center justify-center min-h-screen py-2">
					<Lock />
				</div>
			</div>
		</>
	)
}

export default Home
