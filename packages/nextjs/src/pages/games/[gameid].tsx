import Kalah from '@/components/games/Kalah'
import { useRouter } from 'next/router'

const Game = (): JSX.Element => {
	const router = useRouter()

	return (
		<>
			<head>
				<title>Game {router.query.gameid}</title>
			</head>
			<div className=" bg-light dark:bg-dark min-h-screen flex flex-col justify-center items-center">
				{typeof router.query.gameid == 'undefined' ? <div /> : <Kalah slug={router.query.gameid as string} />}
			</div>
		</>
	)
}

export default Game
