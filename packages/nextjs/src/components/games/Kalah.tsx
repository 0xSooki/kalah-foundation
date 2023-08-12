import React, { useState, useEffect, FC } from 'react'
import KalahaData from '@/artifacts/Kalaha.sol/Kalaha.json'
import Board from './Board'
import {
	useContractRead,
	useContractEvent,
	useAccount,
	ConnectorData,
	useContractWrite,
	usePrepareContractWrite,
} from 'wagmi'
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
	const [win, setWin] = useState(ethers.ZeroAddress)
	const [isViewer, setIsViewer] = useState(false)
	const [turn, setTurn] = useState(false)
	const [lMove, setlMove] = useState(42)
	const { address, connector: activeConnector } = useAccount()
	const { theme } = useTheme()

	const provider = new ethers.InfuraProvider('sepolia', process.env.NEXT_PUBLIC_INFURA_API_KEY)
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
		listener(log) {
			const f = log[0]
			fetchData()
			console.log(f.args.x)
			console.log(f.args._by)
			setlMove(f.args.x + (f.args._by == data[0][0]) ? 0 : 7)
			console.log(f.args.x + (f.args._by == data[0][0]) ? 0 : 7)
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
		address: '0x98954ff59b91da3F183e9BA0111A25Be7778B7C0',
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
		return (
			<Skeleton
				width={944}
				baseColor={theme == 'light' ? '#64230D' : '#FCF2C1'}
				highlightColor="#FF822C"
				height={272}
			/>
		)
	} else if (state[0][0] == ethers.ZeroAddress) {
		return <h1 className="text-3xl dark:text-light text-dark font-bold">Game not found</h1>
	} else {
		return (
			<>
				<div className="dark:text-light text-dark font-bold text-2xl">
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
					<Board
						address={address}
						isViewer={isViewer}
						turn={state[0][Number(state[2]) % 2] == address}
						gameID={gameID}
						board={state[1]}
						players={state[0]}
						lMove={lMove}
					/>
					<div className="w-full flex mt-4">
						{state[0][1] == ethers.ZeroAddress && state[0][0] != address ? (
							<button
								onClick={async () => {
									await refetch()
									write?.()
								}}
								className="btn ml-auto dark:btn-secondary btn-primary"
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
