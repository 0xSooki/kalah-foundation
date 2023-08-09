import Link from 'next/link'
import { ConnectButton } from './ConnectButton'
import ThemeSwitcher from './ThemeSwitcher'
import { MENU_LIST } from '@/lib/consts'
import Logo from '../shared/Logo'
import Image from 'next/image'
import logo from 'public/images/logo.png'
import KalahFoundationLogo from 'public/images/kalah-foundation-logo.svg'

const Header = () => {
	return (
		<>
			<div className="navbar absolute top-0 z-10 min-h-0 dark:bg-dark bg-light">
				<div className="flex-1">
					<Image src={logo} alt="logo" width={50} height={50} />
					<Link className="normal-case font-bold ml-2 font-signika mr-8 dark:text-light text-dark text-3xl" href="/">
						<KalahFoundationLogo />
					</Link>
					<ul className="flex items-center flex-row gap-6">
						{MENU_LIST.map(item => {
							return (
								<li key={item.name}>
									<Link
										className="btn btn-sm btn-ghost normal-case font-bold text-lg text-dark dark:text-light"
										href={item.path}
									>
										{item.name}
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
				<ul className="flex items-center justify-center flex-row gap-6">
					<li className="flex justify-center items-center gap-2 flex-row">
						<ThemeSwitcher /> <ConnectButton />
					</li>
				</ul>
			</div>
		</>
	)
}

export default Header
