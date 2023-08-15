import GameCard from '@/components/games/GameCard'
import React, { useEffect, useState } from 'react'
import { usePrepareContractWrite, useContractWrite, useContractEvent, useNetwork, useAccount } from 'wagmi'
import Skeleton from 'react-loading-skeleton'
import { dark, darkest, getContractAddress, getGraphUrl, light, lightest } from '@/lib/consts'
import { useTheme } from 'next-themes'
import abi from '@/artifacts/Kalaha.sol/Kalaha.json'
import { useRouter } from 'next/router'

interface Log {
	args: {
		_by: string
		_game: number
	}
}

interface Game {
	id: number
	gameID: number
	player1: string
	player2: string
}

interface Data {
	games: Game[]
}

const Games = () => {
	const pageSize = 4
	const { theme } = useTheme()
	const { chain } = useNetwork()
	const router = useRouter()
	const { address } = useAccount()

	const [loading, setLoading] = useState(false)
	const [allGames, setAllGames] = useState<Game[]>([])
	const [colors, setColors] = useState<string[]>([light, lightest])
	const [verifiedOnly, setVerifiedOnly] = useState(false)
	const [data, setData] = useState<Data | undefined>(undefined)
	const [currentPage, setCurrentPage] = useState(1)
	const [allCaughtUp, setAllCaughtUp] = useState(false)
	const [id, setId] = useState(420)

	useEffect(() => {
		setId(chain?.id)
		setAllGames([]) // Reset the games list
		setData(undefined) // Reset the data
		setCurrentPage(1) // Reset the current page
		setAllCaughtUp(false) // Reset the allCaughtUp flag
		setVerifiedOnly(false)
	}, [chain])

	const { config, refetch } = usePrepareContractWrite({
		address: getContractAddress(id),
		abi: abi.abi,
		functionName: 'newGame',
		args: [verifiedOnly],
	})

	const GET_GAMES = `
    query GetGames($first: Int!, $skip: Int!) {
      games(first: $first, skip: $skip, where: { player2: "0x0000000000000000000000000000000000000000" }) {
        id
        gameID
        player1
        player2
      }
    }
  `

	const handleLoadMore = async () => {
		const variables = {
			first: pageSize,
			skip: currentPage * pageSize,
		}

		try {
			setLoading(true)
			const response = await fetch(getGraphUrl(id), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: GET_GAMES,
					variables: variables,
				}),
			})

			const result = await response.json()
			const fetchMoreResult = result.data

			if (fetchMoreResult && fetchMoreResult.games.length === 0) {
				setAllCaughtUp(true)
			}

			if (fetchMoreResult) {
				setData(prevData => ({
					...prevData,
					games: [...prevData.games, ...fetchMoreResult.games],
				}))
				setCurrentPage(prevPage => prevPage + 1)
				setLoading(false)
			}
		} catch (error) {
			// Handle error
		}
	}

	async function fetchData() {
		try {
			setLoading(true)
			const response = await fetch(getGraphUrl(id), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: GET_GAMES,
					variables: {
						first: pageSize,
						skip: (currentPage - 1) * pageSize,
					},
				}),
			})

			const result = await response.json()
			const { loading, error, data: initialData } = result

			if (!loading && !error) {
				setAllGames(initialData.games)
				setData(initialData)
				setLoading(false)
			}
		} catch (error) {
			// Handle error
		}
	}

	useEffect(() => {
		fetchData()
	}, [id, setId])

	const { write } = useContractWrite(config)

	useContractEvent({
		address: getContractAddress(id),
		abi: abi.abi,
		eventName: 'NewGame',
		listener(log) {
			const logData = log[0] as unknown as Log
			if (logData.args._by === address) {
				router.push(`/games/${logData.args._game}`)
			}
		},
	})

	useContractEvent({
		address: getContractAddress(chain?.id),
		abi: abi.abi,
		eventName: 'Join',
		listener(log) {
			const logData = log[0] as unknown as Log
			if (logData.args._by === address) {
				router.push(`/games/${logData.args._game}`)
			}
		},
	})

	useEffect(() => {
		if (data && data.games) {
			const newGames = data.games.filter(newGame => !allGames.some(existingGame => existingGame.id === newGame.id))
			setAllGames(prevGames => [...prevGames, ...newGames])
		}
	}, [data])

	useEffect(() => {
		const updatedColors = theme === 'dark' ? [light, lightest] : [dark, darkest]
		setColors(updatedColors)
	}, [theme])

	return (
		<>
			<head>
				<title>Game Explorer</title>
			</head>
			<div className="min-h-screen flex bg-light dark:bg-dark flex-col">
				<div className="mt-24 flex flex-col items-center justify-center">
					<div className="flex mb-10">
						<h1 className="font-bold text-4xl text-dark dark:text-light">Active Games</h1>
						<div className="flex flex-col">
							<button
								onClick={async () => {
									await refetch()
									write?.()
									router.push('/games')
								}}
								className="btn ml-8 btn-primary dark:btn-secondary"
							>
								New Game
							</button>

							<div className="mt-2 flex justify-center items-center ml-7">
								<input
									disabled={id !== 420}
									type="checkbox"
									checked={verifiedOnly}
									onChange={() => setVerifiedOnly(prevState => !prevState && id === 420)}
									className="mr-2 checkbox checkbox-primary checkbox-sm dark:checkbox-secondary"
								/>
								<label className="text-dark dark:text-light font-born text-xl">Verified only</label>
							</div>
						</div>
					</div>
					{id === 420 || id === 84531 ? (
						<>
							<div>
								{allGames.length === 0 ? (
									<Skeleton
										baseColor={colors[0]}
										highlightColor={colors[1]}
										count={8}
										width={320}
										containerClassName="flex w-screen justify-center flex-wrap"
										className="m-4 shadow-xl rounded-3xl"
										borderRadius={16}
										height={180}
									/>
								) : (
									<div className="flex w-screen justify-center flex-wrap">
										{allGames.map(game => (
											<GameCard key={game.id} className="m-4" address={game.player1} gameID={game.gameID} />
										))}
									</div>
								)}
							</div>
							<div className="flex justify-center mb-8 items-center mt-8">
								{!allCaughtUp && (
									<button onClick={handleLoadMore} className="btn btn-primary dark:btn-secondary">
										{loading ? 'Loading...' : 'Load More'}
									</button>
								)}

								{allCaughtUp && <p className="text-xl font-bold text-dark dark:text-light mt-2">All caught up!</p>}
							</div>
						</>
					) : (
						<div className="font-born text-3xl dark:text-light text-dark">Game explorer not yet supported</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Games
