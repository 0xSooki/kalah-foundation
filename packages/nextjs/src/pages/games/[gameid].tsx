import Kalah from '@/components/games/Kalah'
import { useRouter } from 'next/router'
import Header from '@/components/header/Header'
import Skeleton from 'react-loading-skeleton'

const Game = (): JSX.Element => {
	const router = useRouter()

	if (typeof router.query.gameid == 'undefined') {
		return (
			<div className=" bg-light dark:bg-dark w-full sm:items-center py-4 sm:pt-0">
				<Header />
				<div className="flex flex-col items-center justify-center min-h-screen py-2">
					<Skeleton className="rounded-2xl" width={944} height={272} />
				</div>
			</div>
		)
	} else {
		return (
			<div className=" bg-light dark:bg-dark w-full sm:items-center py-4 sm:pt-0">
				<Header />
				<div className="flex flex-col items-center justify-center min-h-screen py-2">
					<Kalah slug={router.query.gameid as string} />
				</div>
			</div>
		)
	}
}

export default Game
