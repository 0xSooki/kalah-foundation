import React from 'react'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction,} from 'wagmi'

export const Board = ({ gameID, players, board, nonce, winner }) => {
	
	return (
		<div className="flex items-center space-y-4 dark:bg-light bg-dark lg:p-8 p-4 rounded-lg">
			<div className="flex flex-col space-y-4">
				<div className="flex font-rubik text-xl dark:text-light text-dark space-x-4">
					<UnifiedPocket value={board[13]} />
					<div className="flex flex-col space-y-4">
						<div className="flex space-x-4">{renderPockets(7, board, gameID).reverse()}</div>
						<div className="flex space-x-4">{renderPockets(0, board, gameID)}</div>
					</div>
					<UnifiedPocket value={board[6]} />
				</div>
			</div>
		</div>
	)
}

const UnifiedPocket = value => {
	return (
		<div className="lg:w-24 lg:h-42 w-12 h-21  dark:bg-dark flex rounded-2xl bg-light justify-center items-center">
			{Number(value.value)}
		</div>
	)
}
export const HandleMove = ({gameID, value, id}) => {
	const { config , refetch} = usePrepareContractWrite({
		address: '0x98954ff59b91da3F183e9BA0111A25Be7778B7C0',
		abi: [
			{
				"inputs": [
				  {
					"internalType": "uint256",
					"name": "_game",
					"type": "uint256"
				  },
				  {
					"internalType": "uint8",
					"name": "x",
					"type": "uint8"
				  }
				],
				"name": "move",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			  },
		],
		functionName: 'move',
		args: [gameID, id],
		enabled: false
	  })
	
	const { data, write } = useContractWrite(config)
	return (
		<button onClick={async() =>{ await refetch(); write?.();}}
		className="lg:w-24 lg:h-24 h-12 w-12 dark:bg-dark bg-light rounded-2xl flex justify-center items-center"
		>
			{value}
		</button>
	)
}

function renderPockets (tmp, board, gameID) {
	const pockets = []
	for (let i = 0; i <= 5; i++) {
		let prop = {
			gameID: gameID,
			value:Number(board[tmp+i]),
			id:Number(i)
		}
		pockets.push(
			<div key={i}>
				<HandleMove {...prop} />
			</div>
		)
	}
	return pockets
}
export const Join = (gameID) => {
	const { config , refetch} = usePrepareContractWrite({
		address: '0x98954ff59b91da3F183e9BA0111A25Be7778B7C0',
		abi: [
			{
				"inputs": [
				  {
					"internalType": "uint256",
					"name": "_game",
					"type": "uint256"
				  }
				],
				"name": "join",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			  },
		],
		functionName: 'join',
		args: [gameID.gameID],
		enabled: false
	  })
	
	const { data, write } = useContractWrite(config)
	return (
		<button onClick={async() =>{ await refetch(); write?.();}}
		className="lg:w-24 lg:h-24 h-12 w-12 dark:bg-dark bg-light rounded-2xl flex justify-center items-center"
		>
			Join
		</button>
	)
}
