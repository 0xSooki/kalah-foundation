import { shortenAddress } from '@/lib/shortenAddress'
import Link from 'next/link'
import React, { FC } from 'react'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import classNames from '@/lib/classNames'
import { CONTRACT_ADDRESS } from '@/lib/consts'

interface IGameCard {
	gameID: number
	address: string
	className?: string
}

const GameCard: FC<IGameCard> = ({ gameID, address, className = '' }) => {
	const { config, refetch } = usePrepareContractWrite({
		address: CONTRACT_ADDRESS,
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

	const { write } = useContractWrite(config)
	return (
		<div className={classNames('card w-80 dark:text-dark text-light dark:bg-light bg-dark shadow-xl', className)}>
			<div className="card-body">
				<h2 className="card-title">
					<Link href={`/games/${gameID}`}>Game {gameID}</Link>
				</h2>
				<p>{shortenAddress(address)}</p>
				<div className="card-actions justify-end">
					<button
						onClick={async () => {
							await refetch()
							write?.()
						}}
						className="btn btn-secondary dark:btn-primary"
					>
						Join
					</button>
				</div>
			</div>
		</div>
	)
}

export default GameCard
