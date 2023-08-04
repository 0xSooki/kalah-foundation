import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import ThemeSwitcher from './ThemeSwitcher'
import kalah from '@/../public/images/kalah-foundation-logo.svg'
import Image from 'next/image'

const Header = (): JSX.Element => {
	return (
		<>
			<div className="navbar min-h-0 dark:bg-black bg-white">
				<div className="flex-1 text-gray-600">
					<Link className="normal-case font-bold font-signika text-primary text-3xl" href="/">
						<Image src={kalah} alt="Kalah Foundation" width={100} height={20} />
					</Link>
				</div>
				<div className="mr-2">
					<ThemeSwitcher />
				</div>
				<ul className="flex font-signika font-bold text-primary items-center flex-row gap-6">
					<li>
						<ConnectButton />
					</li>
				</ul>
			</div>
		</>
	)
}

export default Header
