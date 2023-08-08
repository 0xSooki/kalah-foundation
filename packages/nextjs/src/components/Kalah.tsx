import React, { useState, useEffect, FC } from 'react'
import KalahaData from '@/artifacts/Kalaha.sol/Kalaha.json'
import Board from './Board'
import { useContractRead, useContractEvent } from 'wagmi'
import { CONTRACT_ADDRESS } from '@/lib/consts'

interface State {
	players: [string, string]
	board: [
		bigint,
		bigint,
		bigint,
		bigint,
		bigint,
		bigint,
		bigint,
		bigint,
		bigint,
		bigint,
		bigint,
		bigint,
		bigint,
		bigint
	]
	nonce: bigint
	winner: string
}

interface Props {
	slug: string
}

const Kalah: FC<Props> = ({ slug }) => {
	const gameID = BigInt(slug)
	const [state, setState] = useState<State>()
	const [win, setWin] = useState(false)

	useContractRead({
		address: `0x${CONTRACT_ADDRESS.substring(2)}`,
		abi: KalahaData.abi,
		functionName: 'state',
		args: [gameID],
		onSuccess(data) {
			setState(data as State)
		},
	})

	useContractEvent({
		address: `0x${CONTRACT_ADDRESS.substring(2)}`,
		abi: KalahaData.abi,
		eventName: 'Win',
		listener(log) {
			setWin(true)
		},
	})

	if (typeof state == 'undefined') {
		return <></>
	} else if (win) {
		return <p>WP the winner is {state[3]}</p>
	} else {
		return (
			<>
				<Board gameID={gameID} board={state[1]} />
			</>
		)
	}
}

export default Kalah
