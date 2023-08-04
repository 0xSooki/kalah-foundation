import { FC } from 'react'
import Board from '@/components/Board'

const Home: FC = () => {
	return (
		<>
			<div className=" bg-light dark:bg-dark w-full sm:items-center py-4 sm:pt-0">
				<div className="flex flex-col items-center justify-center min-h-screen py-2">
					<Board />
				</div>
			</div>
		</>
	)
}

export default Home
