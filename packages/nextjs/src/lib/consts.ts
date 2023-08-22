const APP_NAME = 'Next.js Starter'
const WALLET_CONNECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID
const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_ID
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
const OP_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_OP_CONTRACT_ADDRESS
const GRAPH_API_URL = process.env.NEXT_PUBLIC_GRAPH_API_URL
const GRAPH_API_URL_BASE = process.env.NEXT_PUBLIC_GRAPH_API_URL_BASE
const OPTIMISM_KEY = process.env.NEXT_PUBLIC_OPTIMISM_KEY

type address = `0x${string}`

const getContractAddress = (id: number): address => {
	if (id === 420) {
		return OP_CONTRACT_ADDRESS as address
	} else {
		return CONTRACT_ADDRESS as address
	}
}

const getProvider = (id: number) => {
	if (id === 999) {
		return 'https://testnet.rpc.zora.energy'
	} else if (id === 84531) {
		return 'ttps://goerli.base.org'
	} else {
		return 'https://goerli.optimism.io'
	}
}

const getGraphUrl = (id: number) => {
	if (id === 84531) {
		return process.env.NEXT_PUBLIC_GRAPH_API_URL_BASE
	} else {
		return process.env.NEXT_PUBLIC_GRAPH_API_URL as address
	}
}

const brand = '#FF822C'
const darkest = '#240C04'
const dark = '#64230D'
const mid = '#FDE047'
const light = '#FCF2C1'
const lightest = '#fcf6d7'

const MENU_LIST = [
	{
		name: 'Home',
		path: '/',
	},
	{
		name: 'Dashboard',
		path: '/dashboard',
	},
	{
		name: 'Games',
		path: '/games',
	},
	{
		name: 'Verify',
		path: '/verify',
	},
]

export {
	APP_NAME,
	WALLET_CONNECT_ID,
	ALCHEMY_ID,
	MENU_LIST,
	CONTRACT_ADDRESS,
	GRAPH_API_URL,
	OPTIMISM_KEY,
	brand,
	darkest,
	dark,
	mid,
	light,
	lightest,
	OP_CONTRACT_ADDRESS,
	getContractAddress,
	getGraphUrl,
	GRAPH_API_URL_BASE,
	getProvider,
}
