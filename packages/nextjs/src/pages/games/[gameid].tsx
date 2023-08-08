import Kalah from '@/components/games/Kalah'
import { useRouter } from 'next/router'
import Header from '@/components/header/Header'

const Game = (): JSX.Element => {
	const router = useRouter()

	return (
		<div className=" bg-light dark:bg-dark w-full sm:items-center py-4 sm:pt-0">
			<Header />
			<div className="flex flex-col items-center justify-center min-h-screen py-2">
				{typeof router.query.gameid == 'undefined' ? <div /> : <Kalah slug={router.query.gameid as string} />}
			</div>
		</div>
	)
}

export default Game
