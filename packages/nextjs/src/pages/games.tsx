import GameCard from '@/components/games/GameCard'
import Header from '@/components/header/Header'
import React from 'react'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'

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

	const { data, write } = useContractWrite(config)
	return (
		<>
			<Header />
			<div className="relative min-h-screen flex bg-light dark:bg-dark flex-col  justify-between">
				<div className="mb-auto">
					<div className="mt-16 flex w-full flex-col gap-12 items-center justify-center">
						<div className="flex">
							<h1 className="font-bold text-4xl text-dark dark:text-light">Active Games</h1>

							<button
								onClick={async () => {
									await refetch()
									write?.()
								}}
								className="btn ml-8 btn-secondary"
							>
								New Game
							</button>
						</div>
						<GameCard gameID={1} />
					</div>
				</div>
			</div>
		</>
	)
}

export default Games
