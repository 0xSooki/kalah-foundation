import Link from 'next/link'
import ThemeSwitcher from './ThemeSwitcher'
import Image from 'next/image'
import logo from 'public/images/logo.png'
import KalahFoundLogo from 'public/images/kalah-foundation-logo.svg'

const Header = (): JSX.Element => {
	return (
		<>
			<div className="navbar min-h-0 bg-secondary">
				<div className="ml-24 flex-1">
					<Image src={logo} alt="logo" width={50} height={50} />
					<Link className="normal-case font-bold ml-2 font-signika mr-8 text-primary text-3xl" href="/">
						<KalahFoundLogo />
					</Link>
				</div>
				<div className="flex items-center mr-24 justify-center">
					<ThemeSwitcher />
				</div>
			</div>
		</>
	)
}

export default Header
