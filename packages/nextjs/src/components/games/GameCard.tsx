import { shortenAddress } from '@/lib/shortenAddress'
import Link from 'next/link'
import React, { FC } from 'react'
import { usePrepareContractWrite, useContractWrite, useContractRead, useNetwork } from 'wagmi'
import classNames from '@/lib/classNames'
import { getContractAddress } from '@/lib/consts'
import abi from '@/artifacts/Kalaha.sol/Kalaha.json'

interface IGameCard {
	gameID: number
	address: string
	className?: string
}

const GameCard: FC<IGameCard> = ({ gameID, address, className = '' }) => {
	const { chain } = useNetwork()
	const { config, refetch } = usePrepareContractWrite({
		address: getContractAddress(chain?.id),
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

	const { data } = useContractRead({
		address: getContractAddress(chain?.id),
		abi: abi.abi,
		functionName: 'isVerified',
		args: [gameID],
		enabled: false,
	})

	const { write } = useContractWrite(config)
	return (
		<div className={classNames('card w-80 dark:text-dark text-light dark:bg-light bg-dark shadow-xl', className)}>
			<div className="card-body">
				<div className="flex">
					<h2 className="card-title flex-1">
						<Link href={`/games/${gameID}`}>Game {gameID}</Link>
					</h2>
					<div className="dark:text-dark text-light">
						{data ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon dark:text-dark text-light icon-tabler icon-tabler-certificate"
								width="44"
								height="44"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
								<path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" />
								<path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73" />
								<path d="M6 9l12 0" />
								<path d="M6 12l3 0" />
								<path d="M6 15l2 0" />
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-certificate-off"
								width="44"
								height="44"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M12.876 12.881a3 3 0 0 0 4.243 4.243m.588 -3.42a3.012 3.012 0 0 0 -1.437 -1.423" />
								<path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" />
								<path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2m4 0h10a2 2 0 0 1 2 2v10" />
								<path d="M6 9h3m4 0h5" />
								<path d="M6 12h3" />
								<path d="M6 15h2" />
								<path d="M3 3l18 18" />
							</svg>
						)}
					</div>
				</div>
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
