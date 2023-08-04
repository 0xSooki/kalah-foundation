import Link from 'next/link'
import { ConnectButton } from './ConnectButton'
import ThemeSwitcher from './ThemeSwitcher'
import { MENU_LIST } from '@/lib/consts'
import Logo from '../shared/Logo'

const Header = (): JSX.Element => {
	return (
		<>
			<div className="navbar min-h-0 dark:bg-dark bg-light">
				<div className="flex-1">
					<Link className="normal-case font-bold font-signika mr-8 text-primary text-3xl" href="/">
						<Logo />
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
