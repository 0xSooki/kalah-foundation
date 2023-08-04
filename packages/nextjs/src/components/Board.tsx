import React from 'react'

const Board = () => {
	return (
		<div className="flex items-center space-y-4 dark:bg-light bg-dark lg:p-8 p-4 rounded-lg">
			<div className="flex flex-col space-y-4">
				<div className="flex space-x-4">
					<UnifiedPocket />
					<div className="flex flex-col space-y-4">
						<div className="flex space-x-4">{renderPockets(8, 13).reverse()}</div>
						<div className="flex space-x-4">{renderPockets(1, 6)}</div>
					</div>
					<UnifiedPocket />
				</div>
			</div>
		</div>
	)
}

const UnifiedPocket = () => {
	return (
		<div className="lg:w-24 lg:h-42 w-12 h-21  dark:bg-dark flex rounded-2xl bg-light justify-center items-center">
			Unified
		</div>
	)
}

const renderPockets = (start, end) => {
	const pockets = []
	for (let i = start; i <= end; i++) {
		pockets.push(
			<div
				key={i}
				className="lg:w-24 lg:h-24 h-12 w-12 dark:bg-dark bg-light rounded-2xl flex justify-center items-center"
			>
				{i}
			</div>
		)
	}
	return pockets
}

export default Board
