import { CONTRACT_ADDRESS } from '@/lib/consts'
import { useEffect, useState } from 'react'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'

export const House = ({ isViewer, disable, gameID, turn, value, id, idA, lMove }) => {
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
					{
						internalType: 'uint8',
						name: 'x',
						type: 'uint8',
					},
				],
				name: 'move',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
		],
		functionName: 'move',
		args: [gameID, id],
		enabled: false,
	})
	const { data, write } = useContractWrite(config)
	return (
		<button
			disabled={disable || isViewer || value == 0 || !turn}
			onClick={async () => {
				await refetch()
				write?.()
			}}
			className={"lg:w-24 lg:h-24 md:w-18 md:h-18 h-12 w-12 dark:bg-dark bg-light rounded-2xl flex justify-center items-center "+ ( lMove==idA ? 'border-4 border-brand ' : '')}
		>
			<span className="mt-3">{value}</span>
		</button>
	)
}
