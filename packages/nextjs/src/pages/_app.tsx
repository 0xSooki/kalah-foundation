import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import { AppProps } from 'next/app'
import { WagmiConfig } from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css'
import { darkTheme, getDefaultWallets, lightTheme } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { sepolia, hardhat, localhost } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { useTheme } from 'next-themes'
import { ALCHEMY_ID, WALLET_CONNECT_ID } from '@/lib/consts'

const { chains, publicClient } = configureChains(
	[sepolia, hardhat, localhost],
	[alchemyProvider({ apiKey: ALCHEMY_ID }), publicProvider()]
)

const { connectors } = getDefaultWallets({
	appName: 'kalah',
	projectId: WALLET_CONNECT_ID,
	chains,
})
const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
})

const App = ({
	Component,
	pageProps,
}: AppProps<{
	session: Session
}>) => {
	const { theme } = useTheme()

	return (
		<ThemeProvider attribute="class">
			<WagmiConfig config={wagmiConfig}>
				<SessionProvider refetchInterval={0} session={pageProps.session}>
					<RainbowKitSiweNextAuthProvider>
						<RainbowKitProvider
							theme={theme == 'light' ? lightTheme() : darkTheme()}
							modalSize="compact"
							chains={chains}
						>
							<Component {...pageProps} />
						</RainbowKitProvider>
					</RainbowKitSiweNextAuthProvider>
				</SessionProvider>
			</WagmiConfig>
		</ThemeProvider>
	)
}

export default App
