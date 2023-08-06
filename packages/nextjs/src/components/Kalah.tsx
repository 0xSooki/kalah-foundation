import React, { useState, useEffect, FC } from 'react'
import { ethers } from 'ethers'

import KalahaData from '@/artifacts/Kalaha.sol/Kalaha.json'
import Board from './Board'

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

	const provider = new ethers.JsonRpcProvider()
	const contract = new ethers.Contract(KalahaData.contractAddress, KalahaData.abi, provider)
	const getState = async () => {
		const state = (await contract.state(1)) as State
		setState(state)
	}

	useEffect(() => {
		getState()
	}, [])

	if (typeof state == 'undefined') {
		return <></>
	} else {
		return <Board players={state.players} board={state.board} nonce={state.nonce} winner={state.winner} />
	}
}

export default Kalah
