import React, { useState, useEffect, FC } from 'react'
import KalahaData from '@/artifacts/Kalaha.sol/Kalaha.json'
import Board from './Board'
import { useContractRead, useContractEvent, useAccount, ConnectorData } from 'wagmi'
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
		listener() {
			fetchData()
		},
	})

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
					{isViewer
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
					/>
				</div>
			</>
		)
	}
}

export default Kalah
