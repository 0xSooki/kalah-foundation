import 'tailwindcss/tailwind.css'
import 'react-loading-skeleton/dist/skeleton.css'
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import { AppProps } from 'next/app'
import { WagmiConfig, useNetwork } from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css'
import { darkTheme, getDefaultWallets, lightTheme } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { sepolia, baseGoerli, optimismGoerli, zoraTestnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { useTheme } from 'next-themes'
import { ALCHEMY_ID, GRAPH_API_URL_BASE, WALLET_CONNECT_ID, getGraphUrl } from '@/lib/consts'
import { GRAPH_API_URL } from '@/lib/consts'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Header from '@/components/header/Header'
import Footer from '@/components/Footer'

const { chains, publicClient } = configureChains(
	[sepolia, baseGoerli, optimismGoerli, zoraTestnet],
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

const clientOp = new ApolloClient({
	uri: GRAPH_API_URL,
	cache: new InMemoryCache(),
})

const clientBase = new ApolloClient({
	uri: GRAPH_API_URL_BASE,
	cache: new InMemoryCache(),
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
							<ApolloProvider client={clientOp}>
								<div className="flex flex-col min-h-screen">
									<Header />
									<main className="relative mt-12 flex flex-col flex-1">
										<Component {...pageProps} />
									</main>
									<Footer />
								</div>
							</ApolloProvider>
						</RainbowKitProvider>
					</RainbowKitSiweNextAuthProvider>
				</SessionProvider>
			</WagmiConfig>
		</ThemeProvider>
	)
}

export default App
