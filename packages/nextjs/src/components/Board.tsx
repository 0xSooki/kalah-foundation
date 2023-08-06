import React from 'react'

const Board = ({ players, board, nonce, winner }) => {
	return (
		<div className="flex items-center space-y-4 dark:bg-light bg-dark lg:p-8 p-4 rounded-lg">
			<div className="flex flex-col space-y-4">
				<div className="flex font-rubik text-xl dark:text-light text-dark space-x-4">
					<UnifiedPocket value={board[6]} />
					<div className="flex flex-col space-y-4">
						<div className="flex space-x-4">{renderPockets(8, 13, board).reverse()}</div>
						<div className="flex space-x-4">{renderPockets(1, 6, board)}</div>
					</div>
					<UnifiedPocket value={board[13]} />
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

const renderPockets = (start, end, board) => {
	const pockets = []
	for (let i = start; i <= end; i++) {
		pockets.push(
			<div
				key={i}
				className="lg:w-24 lg:h-24 h-12 w-12 dark:bg-dark bg-light rounded-2xl flex justify-center items-center"
			>
				{Number(board[i - 1])}
			</div>
		)
	}
	return pockets
}

export default Board
