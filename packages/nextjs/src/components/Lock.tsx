import React, { FC, useState } from 'react'
import { ethers } from 'ethers'

import LockData from '@/artifacts/Lock.sol/Lock.json'

const Lock: FC = () => {
	const [unlockTime, setUnlockTime] = useState('')

	const getTime = async () => {
		const provider = new ethers.JsonRpcProvider()
		const contract = new ethers.Contract(LockData.contractAddress, LockData.abi, provider)
		const time = await contract.unlockTime()
		console.log(time)
		setUnlockTime(time)
	}

	return (
		<div>
			<h1>Lock Contract</h1>
			<button onClick={getTime}>Get Time</button>
			<p>{unlockTime}</p>
		</div>
	)
}

export default Lock
