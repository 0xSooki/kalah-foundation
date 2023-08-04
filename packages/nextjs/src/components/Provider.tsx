import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { hardhat, localhost } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { FC } from 'react'
import { ALCHEMY_ID, WALLET_CONNECT_ID } from '@/lib/consts'

const { chains, publicClient } = configureChains(
	[localhost],
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

interface Provider {
	children: React.ReactNode
}

const Provider: FC<Provider> = ({ children }) => {
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider modalSize="compact" chains={chains}>
				{children}
			</RainbowKitProvider>
		</WagmiConfig>
	)
}

export default Provider
