import GameCard from '@/components/games/GameCard'
import Header from '@/components/header/Header'
import React, { useEffect, useState } from 'react'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { gql, useQuery } from '@apollo/client'
import Skeleton from 'react-loading-skeleton'
import { CONTRACT_ADDRESS } from '@/lib/consts'
import { useTheme } from 'next-themes'
import { dark, darkest, light, lightest } from '@/lib/consts'

const Games = () => {
	const pageSize = 5
	const [currentPage, setCurrentPage] = useState(1)
	const [allGames, setAllGames] = useState([])
	const [colors, setColors] = useState([])
	const { theme } = useTheme()

	const { config, refetch } = usePrepareContractWrite({
		address: CONTRACT_ADDRESS,
		abi: [
			{
				inputs: [],
				name: 'newGame',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
		],
		functionName: 'newGame',
	})

	const GET_GAMES = gql`
		query GetGames($first: Int!, $skip: Int!) {
			games(first: $first, skip: $skip, where: { player2: "0x0000000000000000000000000000000000000000" }) {
				id
				gameID
				player1
				player2
			}
		}
	`

	const { loading, error, data, fetchMore } = useQuery(GET_GAMES, {
		variables: {
			first: pageSize,
			skip: (currentPage - 1) * pageSize,
		},
	})

	const { write } = useContractWrite(config)

	const handleLoadMore = () => {
		fetchMore({
			variables: {
				first: pageSize,
				skip: currentPage * pageSize,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev
				return Object.assign({}, prev, {
					games: [...prev.games, ...fetchMoreResult.games],
				})
			},
		})
		setCurrentPage(prevPage => prevPage + 1)
	}

	useEffect(() => {
		if (data && data.games) {
			const newGames = data.games.filter(newGame => !allGames.some(existingGame => existingGame.id === newGame.id))
			setAllGames(prevGames => [...prevGames, ...newGames].sort((a, b) => a.id - b.id))
		}
	}, [data])

	useEffect(() => {
		if (theme === 'dark') {
			setColors([light, lightest])
		} else {
			setColors([dark, darkest])
		}
	}, [theme])

	return (
		<>
			<div className="min-h-screen flex bg-light dark:bg-dark flex-col">
				<div className="mt-24 flex flex-col items-center justify-center">
					<div className="flex mb-10">
						<h1 className="font-bold text-4xl text-dark dark:text-light">Active Games</h1>
						<button
							onClick={async () => {
								await refetch()
								write?.()
							}}
							className="btn ml-8 btn-primary dark:btn-secondary"
						>
							New Game
						</button>
					</div>
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
					{(!data || data.games.length >= pageSize) && (
						<button onClick={handleLoadMore} className="btn btn-primary dark:btn-secondary">
							{loading ? 'Loading...' : 'Load More'}
						</button>
					)}

					{!loading && (!data || data.games.length < pageSize) && (
						<p className="text-xl font-bold text-dark dark:text-light mt-2">All caught up!</p>
					)}
				</div>
			</div>
		</>
	)
}

export default Games
