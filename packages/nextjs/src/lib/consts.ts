const APP_NAME = 'Next.js Starter'
const WALLET_CONNECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID
const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_ID

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

export { APP_NAME, WALLET_CONNECT_ID, ALCHEMY_ID, MENU_LIST }
