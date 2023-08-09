import GameCard from '@/components/games/GameCard'
import Header from '@/components/header/Header'
import React, { useEffect, useState } from 'react'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client'
import { GRAPH_API_URL } from '@/lib/consts'
import Skeleton from 'react-loading-skeleton'

interface Game {
	id: string
	gameID: number
	player1: string
	player2: string
}

const Games = () => {
	const { config, refetch } = usePrepareContractWrite({
		address: '0x98954ff59b91da3F183e9BA0111A25Be7778B7C0',
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
		query GetGames {
			games(first: 5, where: { player2: "0x0000000000000000000000000000000000000000" }) {
				id
				gameID
				player1
				player2
			}
		}
	`
	const { loading, error, data } = useQuery(GET_GAMES)

	console.log(data)
	const { write } = useContractWrite(config)
	return (
		<>
			<div className="min-h-screen flex bg-light dark:bg-dark flex-col justify-between">
				<div className="mt-24 flex flex-col gap-12 items-center justify-center">
					<div className="flex">
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
					{data == undefined ? (
						<div>
							<Skeleton
								highlightColor="#FFFFFF"
								count={3}
								width={384}
								className="mb-12 shadow-xl rounded-3xl dark:bg-light bg-dark"
								borderRadius={12}
								height={180}
							/>
						</div>
					) : (
						data.games.map(game => <GameCard key={game.id} gameID={game.gameID} />)
					)}
				</div>
			</div>
		</>
	)
}

export default Games
