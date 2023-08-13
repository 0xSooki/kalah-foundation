/* eslint-disable react/no-unescaped-entities */
import { FC, use, useEffect, useState } from 'react'
import { CONTRACT_ADDRESS } from '@/lib/consts'
import KalahData from '@/artifacts/Kalaha.sol/Kalaha.json'
import { useContractEvent } from 'wagmi'
import { gql, useQuery } from '@apollo/client'
import { shortenAddress } from '@/lib/shortenAddress'
import Skeleton from 'react-loading-skeleton'
import { useTheme } from 'next-themes'
import { dark, darkest, light, lightest } from '@/lib/consts'

const Home: FC = () => {
	const [moveHistory, setMoveHistory] = useState([])
	const [colors, setColors] = useState([])
	const { theme } = useTheme()

	useContractEvent({
		address: `0x${CONTRACT_ADDRESS.substring(2)}`,
		abi: KalahData.abi,
		eventName: 'Move',
		listener(log) {
			console.log(log[0])
			setMoveHistory(prev => [...prev, log[0]])
		},
	})

	const GET_GAMES = gql`
		query GetGames {
			games(first: 4, where: { player2: "0x0000000000000000000000000000000000000000" }) {
				id
				gameID
				player1
				player2
			}
		}
	`

	const GET_STARTED_GAMES = gql`
		query GetGames {
			games(first: 4, where: { player2_not: "0x0000000000000000000000000000000000000000" }) {
				id
				gameID
				player1
				player2
			}
		}
	`

	const { loading, error, data } = useQuery(GET_GAMES)

	const { loading: loading2, error: error2, data: data2 } = useQuery(GET_STARTED_GAMES)

	useEffect(() => {
		if (theme === 'light') {
			setColors([light, lightest])
		} else {
			setColors([dark, darkest])
		}
	}, [theme])

	return (
		<>
			<div className="flex flex-col min-h-screen bg-light dark:bg-dark py-2">
				<div className="mx-10 mb-24">
					<div className="text-dark mb-10 font-born dark:text-light text-4xl mt-24 text-center">
						The first ever <span className="underline decoration-brand">permissionless</span> competetive kalah platform{' '}
						<br /> governed by law of code and math. Now live on{' '}
						<a
							target="_blank"
							href={`https://goerli-optimism.etherscan.io/address/${CONTRACT_ADDRESS}`}
							className="underline decoration-red-600"
						>
							Optimism
						</a>
						,{' '}
						<a
							target="_blank"
							href={`https://goerli.basescan.org//address/${CONTRACT_ADDRESS}`}
							className="underline decoration-blue-600"
						>
							Base
						</a>{' '}
						and{' '}
						<a
							target="_blank"
							href={`https://testnet.explorer.zora.energy/address/${CONTRACT_ADDRESS}`}
							className="underline decoration-green-800"
						>
							Zora
						</a>
					</div>
					<div className="flex flex-col lg:items-start items-center justify-center lg:flex-row">
						<div className="flex flex-col">
							<div className="flex-wrap flex justify-center lg:mx-6">
								<div className="card mb-12 w-96 lg:w-100 shadow-2xl bg-dark dark:bg-light text-light dark:text-dark">
									<div className="card-body items-center text-center">
										<h2 className="card-title text-3xl font-born">Rules</h2>
										<ul className="text-start font-born text-2xl list-disc list-inside">
											<li>Kalah is a two-player board game.</li>
											<li>Players have 6 small pits and 1 large Kalah pit each.</li>
											<li>
												Players take turns moving all seeds from one of their pits and putting one in each following pit
												or Kalah counterclockwise.
											</li>
											<li>Land in your Kalah to get another turn.</li>
											<li>The game ends when a player's side is empty at the start of their turn.</li>
											<li>You can't win with an extra turn.</li>
										</ul>
										<div className="card-actions justify-end"></div>
									</div>
								</div>
							</div>

							<div className="flex-wrap flex mb-12 lg:mx-6">
								<div className="card w-96 lg:w-100 shadow-2xl bg-dark dark:bg-light text-light dark:text-dark">
									<div className="card-body items-center text-center">
										<h2 className="card-title mb-4 text-3xl font-born">Most recent moves</h2>
										<div className="overflow-y-auto overflow-x-hidden w-full h-80">
											{moveHistory.length === 0 ? (
												<div className="font-born text-xl">No recent moves</div>
											) : (
												moveHistory.map((move, id) => {
													return (
														<div
															key={id}
															className="bg-light dark:bg-dark text-xl pt-3 font-born w-full mr-1 mb-3 text-dark dark:text-light p-2 rounded-lg"
														>
															Move form house {move.args.x} in game {Number(move.args._game)} (
															<a
																className="underline decoration-brand"
																href={`https://sepolia.etherscan.io/tx/${move.transactionHash}`}
															>
																tx
															</a>
															)
														</div>
													)
												})
											)}
										</div>
										<div className="card-actions justify-end"></div>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col">
							<div className="flex-wrap mb-12 flex lg:mx-6">
								<div className="card w-96 shadow-2xl bg-dark dark:bg-light text-light dark:text-dark">
									<div className="card-body items-center text-center">
										<h2 className="card-title font-born text-3xl">Most recent games</h2>
										<div className="w-full">
											{loading || typeof data == 'undefined' ? (
												<>
													<Skeleton
														count={4}
														width={320}
														height={64}
														borderRadius={8}
														className="mb-3"
														baseColor={colors[0]}
														highlightColor={colors[1]}
													/>
												</>
											) : (
												<>
													{data.games.map((game, id) => {
														return (
															<a
																className="bg-light h-16 flex items-center justify-center text-dark dark:text-light rounded-lg dark:bg-dark w-full mr-1 mb-4"
																key={id}
																href={`/games/${game.id}`}
															>
																<p className="mt-2 font-born text-xl">
																	Game {game.id}, {shortenAddress(game.player1)}
																</p>
																<button className="btn mr-4 dark:btn-secondary btn-sm btn-primary">join</button>
															</a>
														)
													})}{' '}
												</>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="flex-wrap flex lg:mx-6">
								<div className="card w-96 shadow-2xl bg-dark dark:bg-light text-light dark:text-dark">
									<div className="card-body items-center text-center">
										<h2 className="card-title font-born text-3xl">Recently started games</h2>
										<div className="w-full">
											{loading2 || typeof data2 == 'undefined' ? (
												<>
													<Skeleton
														count={4}
														width={320}
														borderRadius={8}
														height={64}
														className="mb-3"
														baseColor={colors[0]}
														highlightColor={colors[1]}
													/>
												</>
											) : (
												<>
													{data2.games.map((game, id) => {
														return (
															<a
																className="bg-light h-16 mb-4 flex items-center justify-center text-dark dark:text-light rounded-lg dark:bg-dark w-full mr-1"
																key={id}
																href={`/games/${game.id}`}
															>
																<p className="font-born text-xl mt-2">
																	Game {game.id}, {shortenAddress(game.player1)}
																</p>
																<button className="btn mr-4 dark:btn-secondary btn-sm btn-primary">view</button>
															</a>
														)
													})}
												</>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home
