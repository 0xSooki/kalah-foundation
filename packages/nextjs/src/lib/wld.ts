import { AbiCoder as abi } from 'ethers'

const decode = <T>(type: string, encodedString: string): T => {
	return abi.defaultAbiCoder().decode([type], encodedString)[0]
}

export default decode
