import React from 'react'
import { House } from './House'

const Board = ({ gameID, board, turn, players, isViewer, address, lMove }) => {
	const p1 = address != players[1]
	const tmp = p1 ? 0 : 7
	return (
		<div className="flex items-center space-y-4 dark:bg-light bg-dark lg:p-8 md:p-6 p-4 rounded-lg">
			<div className="flex flex-col space-y-4">
				<div className="flex font-born lg:text-4xl md:text-3xl text-2xl  dark:text-light text-dark space-x-4">
					<UnifiedPocket value={board[13 - tmp]} />
					<div className="flex flex-col space-y-4">
						<div className="flex space-x-4">{renderPockets(turn, isViewer, p1, 7 - tmp, board, gameID, lMove).reverse()}</div>
						<div className="flex space-x-4">{renderPockets(turn, isViewer, p1, tmp, board, gameID, lMove)}</div>
					</div>
					<UnifiedPocket value={board[6 + tmp]} />
				</div>
			</div>
		</div>
	)
}

const UnifiedPocket = (value: { value: any }) => {
	return (
		<div className="lg:w-24 lg:h-42 md:w-18 md:h-30 w-12 h-21 dark:bg-dark flex rounded-2xl bg-light justify-center items-center">
			{Number(value.value)}
		</div>
	)
}

const renderPockets = (
	turn: boolean,
	isViewer: boolean,
	p1: boolean,
	tmp: number,
	board: { [x: string]: any },
	gameID: any,
	lMove: number
) => {
	const pockets = []
	for (let i = 0; i <= 5; i++) {
		let prop = {
			isViewer: isViewer,
			disable: (p1 && tmp == 7) || (!p1 && tmp == 0),
			gameID: gameID,
			turn: turn,
			value: Number(board[tmp + i]),
			id: Number(i),
			idA: i + tmp,
			lMove: lMove
		}
		pockets.push(
			<div key={i}>
				<House {...prop} />
			</div>
		)
	}
	return pockets
}

export default Board
