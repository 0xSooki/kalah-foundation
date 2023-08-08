const APP_NAME = 'Next.js Starter'
const WALLET_CONNECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID
const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_ID
const CONTRACT_ADDRESS = '0x98954ff59b91da3f183e9ba0111a25be7778b7c0'
const GRAPH_API_URL = process.env.NEXT_PUBLIC_GRAPH_API_URL

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

export { APP_NAME, WALLET_CONNECT_ID, ALCHEMY_ID, MENU_LIST, CONTRACT_ADDRESS, GRAPH_API_URL }
