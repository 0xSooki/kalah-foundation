import React, { useState, useEffect, FC } from 'react'
import KalahaData from '@/artifacts/Kalaha.sol/Kalaha.json'
import Board from './Board'
import { useContractRead, useContractEvent, useAccount } from 'wagmi'
import { CONTRACT_ADDRESS } from '@/lib/consts'
import { ethers } from 'ethers'
import Skeleton from 'react-loading-skeleton'
import { useTheme } from 'next-themes'
import { shortenAddress } from '@/lib/shortenAddress'

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
	const [isViewer, setIsViewer] = useState(false)
	const [turn, setTurn] = useState(false)
	const { address } = useAccount()

	const provider = new ethers.InfuraProvider('sepolia', process.env.NEXT_PUBLIC_INFURA_API_KEY)
	const contract = new ethers.Contract(`0x${CONTRACT_ADDRESS.substring(2)}`, KalahaData.abi, provider)

	const getData = async () => {
		const data = await contract.state(gameID)
		setState(data as State)
	}

	const { isLoading } = useContractRead({
		address: `0x${CONTRACT_ADDRESS.substring(2)}`,
		abi: KalahaData.abi,
		functionName: 'state',
		args: [gameID],
		onSuccess(res) {
			const data = res as State
			setState(data)
			setIsViewer(!(address == data[0][1] || address == data[0][0]))
			setTurn(data[0][Number(data[2]) % 2] == address)
		},
	})

	useContractEvent({
		address: `0x${CONTRACT_ADDRESS.substring(2)}`,
		abi: KalahaData.abi,
		eventName: 'Move',
		listener() {
			getData()
		},
	})

	useContractEvent({
		address: `0x${CONTRACT_ADDRESS.substring(2)}`,
		abi: KalahaData.abi,
		eventName: 'Win',
		listener() {
			setWin(true)
		},
	})

	const { theme } = useTheme()

	if (typeof state == 'undefined' || isLoading) {
		return (
			<Skeleton
				width={944}
				baseColor={theme == 'light' ? '#64230D' : '#FCF2C1'}
				highlightColor="#FF822C"
				height={272}
			/>
		)
	} else if (win) {
		return <p>WP the winner is {state[3]}</p>
	} else {
		return (
			<>
				<div>
					<div className="dark:text-light text-dark text-2xl">
						{isViewer ? (
							<>{turn ? `${shortenAddress(state[0][0])}'s turn` : `${shortenAddress(state[0][1])}'s turn`}</>
						) : (
							<>{turn ? 'Your turn' : "Opponent's turn"}</>
						)}
					</div>
					<Board address={address} isViewer={isViewer} gameID={gameID} board={state[1]} players={state[0]} />
				</div>
			</>
		)
	}
}

export default Kalah
