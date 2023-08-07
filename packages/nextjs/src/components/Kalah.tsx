import React, { useState, useEffect, FC } from 'react'
import { ethers } from 'ethers'

import KalahaData from '@/artifacts/Kalaha.sol/Kalaha.json'
import Board from './Board'
import { useContractRead } from 'wagmi'
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

	// const provider = new ethers.JsonRpcProvider()
	// const contract = new ethers.Contract(KalahaData.contractAddress, KalahaData.abi, provider)

	useContractRead({
		address: `0x${CONTRACT_ADDRESS.substring(2)}`,
		abi: KalahaData.abi,
		functionName: 'state',
		args: [1],
		onSuccess(data) {
			setState(data as State)
		},
	})

	// const getState = async () => {
	// 	const state = await contract.state(1)
	// 	console.log(await provider.getBlockNumber())
	// 	setState(state)
	// }

	// useEffect(() => {
	// 	getState()
	// }, [])

	if (typeof state == 'undefined') {
		return <></>
	} else {
		return <Board players={state[0]} board={state[1]} nonce={state[2]} winner={state[3]} />
	}
}

export default Kalah
