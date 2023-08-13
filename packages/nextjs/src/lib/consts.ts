const APP_NAME = 'Next.js Starter'
const WALLET_CONNECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID
const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_ID
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
const GRAPH_API_URL = process.env.NEXT_PUBLIC_GRAPH_API_URL
const OPTIMISM_KEY = process.env.NEXT_PUBLIC_OPTIMISM_KEY

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
		name: 'Contact',
		path: '/contact',
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
}
