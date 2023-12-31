import React, { useState, useEffect, FC } from 'react'
import KalahaData from '@/artifacts/Kalaha.sol/Kalaha.json'
import Board from './Board'
import {
	useContractRead,
	useContractEvent,
	useAccount,
	useContractWrite,
	usePrepareContractWrite,
	useNetwork,
} from 'wagmi'
import { ethers } from 'ethers'
import { shortenAddress } from '@/lib/shortenAddress'
import { getContractAddress, getProvider } from '@/lib/consts'

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

interface Log {
	args: {
		x: number
		_by: string
	}
}

const Kalah: FC<Props> = ({ slug }) => {
	const gameID = BigInt(slug)
	const [state, setState] = useState<State>()
	const [win, setWin] = useState(ethers.ZeroAddress)
	const [isViewer, setIsViewer] = useState(false)
	const [turn, setTurn] = useState(false)
	const [lMove, setlMove] = useState({ x: 42, _by: '0' })
	const { address, connector: activeConnector } = useAccount()
	const { chain } = useNetwork()

	const provider = new ethers.JsonRpcProvider(getProvider(chain?.id))
	const contract = new ethers.Contract(getContractAddress(chain?.id), KalahaData.abi, provider)

	const fetchData = async () => {
		const data = await contract.state(gameID)
		setState(data as State)
	}

	const { isLoading } = useContractRead({
		address: getContractAddress(chain?.id),
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
		address: getContractAddress(chain?.id),
		abi: KalahaData.abi,
		eventName: 'Move',
		listener(log) {
			const f = log[0] as unknown as Log
			fetchData()
			setlMove(f.args)
		},
	})

	useContractEvent({
		address: getContractAddress(chain?.id),
		abi: KalahaData.abi,
		eventName: 'Join',
		listener() {
			fetchData()
		},
	})

	const { config, refetch } = usePrepareContractWrite({
		address: getContractAddress(chain?.id),
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
						lMove={lMove.x + (lMove._by == state[0][0] ? 0 : 7)}
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
