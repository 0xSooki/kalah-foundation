import Link from 'next/link'
import { ConnectButton } from './ConnectButton'
import { MENU_LIST } from '@/lib/consts'
import Image from 'next/image'
import logo from 'public/images/logo.png'
import KalahFoundationLogo from 'public/images/kalah-foundation-logo.svg'
import ThemeSwitcher from './ThemeSwitcher'

const Header = () => {
	return (
		<div className="navbar top-0 z-10 absolute min-h-0 dark:bg-dark bg-light">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 dark:text-light text-dark"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
						</svg>
					</label>
					<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
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

				<a className="flex font-bold normal-case ml-2 dark:text-light text-dark text-3xl">
					<Image className="mr-4" src={logo} alt="logo" width={50} height={50} />

					<div className="mr-12">
						<KalahFoundationLogo />
					</div>
				</a>

				<div className="navbar top-0 z-10 min-h-0 hidden lg:flex">
					<ul className=" px-1">
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
			</div>
			<div className="navbar-end">
				<ThemeSwitcher className="mr-2" />
				<ConnectButton />
			</div>
		</div>
	)
}

export default Header
