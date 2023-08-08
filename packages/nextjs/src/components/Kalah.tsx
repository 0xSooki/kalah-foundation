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
const Kalah = () => {
	const [state, setState] = useState<State>()
	const [win, setWin] = useState(false)
	const gameID: BigInt = 1n

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
				<Board gameID={gameID} players={state[0]} board={state[1]} nonce={state[2]} winner={state[3]} />
			</>
		)
	}
}

export default Kalah
