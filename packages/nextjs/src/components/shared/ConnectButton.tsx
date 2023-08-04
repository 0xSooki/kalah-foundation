import { ConnectButton as CustomButton } from '@rainbow-me/rainbowkit'
export const ConnectButton = () => {
	return (
		<CustomButton.Custom>
			{({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
				// Note: If your app doesn't use authentication, you
				// can remove all 'authenticationStatus' checks
				const ready = mounted && authenticationStatus !== 'loading'
				const connected =
					ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')
				return (
					<div
						{...(!ready && {
							'aria-hidden': true,
							style: {
								opacity: 0,
								pointerEvents: 'none',
								userSelect: 'none',
							},
						})}
					>
						{(() => {
							if (!connected) {
								return (
									<button
										className="btn btn-sm btn-primary dark:btn-secondary"
										onClick={openConnectModal}
										type="button"
									>
										Connect Wallet
									</button>
								)
							}
							if (chain.unsupported) {
								return (
									<button className="btn btn-sm btn-primary dark:btn-secondary" onClick={openChainModal} type="button">
										Wrong network
									</button>
								)
							}
							return (
								<div style={{ display: 'flex', gap: 12 }}>
									<button
										className="btn btn-sm btn-primary dark:btn-secondary"
										onClick={openChainModal}
										style={{ display: 'flex', alignItems: 'center' }}
										type="button"
									>
										{chain.hasIcon && (
											<div
												style={{
													background: chain.iconBackground,
													width: 12,
													height: 12,
													borderRadius: 999,
													overflow: 'hidden',
													marginRight: 4,
												}}
											>
												{chain.iconUrl && (
													<img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} style={{ width: 12, height: 12 }} />
												)}
											</div>
										)}
										{chain.name}
									</button>
									<button
										className="btn btn-sm btn-primary dark:btn-secondary"
										onClick={openAccountModal}
										type="button"
									>
										{account.displayName}
										{account.displayBalance ? ` (${account.displayBalance})` : ''}
									</button>
								</div>
							)
						})()}
					</div>
				)
			}}
		</CustomButton.Custom>
	)
}
