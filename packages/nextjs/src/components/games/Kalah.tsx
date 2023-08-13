import React, { useState, useEffect, FC } from 'react'
import KalahaData from '@/artifacts/Kalaha.sol/Kalaha.json'
import Board from './Board'
import { useContractRead, useContractEvent, useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { CONTRACT_ADDRESS } from '@/lib/consts'
import { ethers } from 'ethers'
import { useTheme } from 'next-themes'
import { shortenAddress } from '@/lib/shortenAddress'
import { getNetwork } from '@wagmi/core'

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
	const [win, setWin] = useState(ethers.ZeroAddress)
	const [isViewer, setIsViewer] = useState(false)
	const [turn, setTurn] = useState(false)
	const { address, connector: activeConnector } = useAccount()
	const { theme } = useTheme()
	const { chain } = getNetwork()

	const provider = ethers.getDefaultProvider(chain.network)
	const contract = new ethers.Contract(`0x${CONTRACT_ADDRESS.substring(2)}`, KalahaData.abi, provider)

	const fetchData = async () => {
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
			setWin(data[3])
			setIsViewer(!(address == data[0][1] || address == data[0][0]))
			setTurn(data[0][Number(data[2]) % 2] == data[0][0])
		},
	})

	useContractEvent({
		address: `0x${CONTRACT_ADDRESS.substring(2)}`,
		abi: KalahaData.abi,
		eventName: 'Move',
		listener() {
			fetchData()
		},
	})

	useContractEvent({
		address: `0x${CONTRACT_ADDRESS.substring(2)}`,
		abi: KalahaData.abi,
		eventName: 'Join',
		listener() {
			fetchData()
		},
	})

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
				],
				name: 'join',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
		],
		functionName: 'join',
		args: [gameID],
		enabled: false,
	})

	const { data, write } = useContractWrite(config)

	useEffect(() => {
		if (activeConnector) {
			activeConnector.on('change', () => fetchData())
		}
	}, [activeConnector])

	if (typeof state == 'undefined' || isLoading) {
		return <div className="text-6xl dark:text-light text-dark font-born ">Loading...</div>
	} else if (state[0][0] == ethers.ZeroAddress) {
		return <h1 className="text-3xl dark:text-light text-dark font-bold">Game not found</h1>
	} else {
		return (
			<>
				<div className="dark:text-light text-4xl text-dark font-bold">
					<span className="font-born ">
						{state[0][1] == ethers.ZeroAddress
							? 'waiting for opponent'
							: isViewer
							? win != ethers.ZeroAddress
								? `${shortenAddress(win)} won`
								: turn
								? `${shortenAddress(state[0][0])}'s turn`
								: `${shortenAddress(state[0][1])}'s turn`
							: win != ethers.ZeroAddress
							? win == address
								? 'You won'
								: 'You lost'
							: state[0][Number(state[2]) % 2] == address
							? 'Your turn'
							: "Opponent's turn"}
					</span>
					<Board
						address={address}
						isViewer={isViewer}
						turn={state[0][Number(state[2]) % 2] == address}
						gameID={gameID}
						board={state[1]}
						players={state[0]}
					/>
					<div className="w-full flex mt-4">
						{state[0][1] == ethers.ZeroAddress && state[0][0] != address ? (
							<button
								onClick={async () => {
									await refetch()
									write?.()
								}}
								className="btn font-bold ml-auto dark:btn-secondary btn-primary"
							>
								JOIN GAME
							</button>
						) : (
							<p></p>
						)}
					</div>
				</div>
			</>
		)
	}
}

export default Kalah
