import React, { FC } from 'react'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'

interface IGameCard {
	gameID: number
}

const GameCard: FC<IGameCard> = ({ gameID }) => {
	const { config, refetch } = usePrepareContractWrite({
		address: '0x98954ff59b91da3F183e9BA0111A25Be7778B7C0',
		abi: [
			{
				inputs: [
					{
						internalType: 'uint256',
						name: '_game',
						type: 'uint256',
					},
				],
				name: 'join',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
		],
		functionName: 'join',
		args: [gameID],
		enabled: false,
	})

	const { data, write } = useContractWrite(config)
	return (
		<div className="card w-96 text-dark bg-light shadow-xl">
			<div className="card-body">
				<h2 className="card-title">Game {gameID}</h2>
				<p>data...</p>
				<div className="card-actions justify-end">
					<button className="btn btn-primary">Join</button>
				</div>
			</div>
		</div>
	)
}

export default GameCard
