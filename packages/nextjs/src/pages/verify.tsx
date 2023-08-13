import { useState } from 'react'
import decode from '@/lib/wld'
import ContractAbi from '@/artifacts/Kalaha.sol/Kalaha.json'
import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit'
import { useAccount, useContractRead, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'
import { OP_CONTRACT_ADDRESS } from '@/lib/consts'

export default function Verify() {
	const { address } = useAccount()
	const [proof, setProof] = useState<ISuccessResult | null>(null)
	const { chain } = useNetwork()

	const { config } = usePrepareContractWrite({
		address: OP_CONTRACT_ADDRESS,
		abi: ContractAbi.abi,
		enabled: proof != null && address != null,
		functionName: 'verify',
		args: [
			address!,
			proof?.merkle_root ? decode<BigInt>('uint256', proof?.merkle_root ?? '') : BigInt(0),
			proof?.nullifier_hash ? decode<BigInt>('uint256', proof?.nullifier_hash ?? '') : BigInt(0),
			proof?.proof
				? decode<[BigInt, BigInt, BigInt, BigInt, BigInt, BigInt, BigInt, BigInt]>('uint256[8]', proof?.proof ?? '')
				: [BigInt(0), BigInt(0), BigInt(0), BigInt(0), BigInt(0), BigInt(0), BigInt(0), BigInt(0)],
		],
	})

	const { data } = useContractRead({
		address: OP_CONTRACT_ADDRESS as `${'0x'}${string}`,
		abi: ContractAbi.abi,
		functionName: 'isVerified',
		args: [address!],
	})

	const { write } = useContractWrite(config)
	if (chain?.id === 420) {
		return (
			<div className="flex flex-col min-h-screen bg-light dark:bg-dark items-center justify-center py-2">
				{data ? (
					<div className="text-4xl dark:text-light text-dark font-born">Already verified</div>
				) : proof ? (
					<div>
						<button className="btn btn-primary dark:bg-secondary text-light dark:text-dark" onClick={write}>
							verify
						</button>
					</div>
				) : (
					<div>
						<IDKitWidget
							signal={address}
							action="user-verification"
							onSuccess={setProof}
							app_id={process.env.NEXT_PUBLIC_WLD_APP_ID!}
						>
							{({ open }) => (
								<button className="btn btn-primary dark:bg-secondary text-light dark:text-dark" onClick={open}>
									verify with world id
								</button>
							)}
						</IDKitWidget>
					</div>
				)}
			</div>
		)
	} else {
		return (
			<>
				{' '}
				<div className="flex flex-col min-h-screen bg-light dark:bg-dark items-center justify-center py-2">
					<div className="text-4xl dark:text-light text-center text-dark font-born">
						Verification currently is only
						<br />
						available on Optimism
					</div>
				</div>
			</>
		)
	}
}
