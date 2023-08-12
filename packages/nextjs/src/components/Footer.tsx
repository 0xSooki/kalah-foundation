import { MENU_LIST } from '@/lib/consts'
import Link from 'next/link'
import React from 'react'
import logo from 'public/images/logo.png'
import Image from 'next/image'
import KalahFoundLogo from './shared/KalahFoundLogo'

const Footer = () => {
	return (
		<footer className="p-10 dark:bg-darkest w-full bg-lightest">
			<div className="flex items-center justify-center mx-14">
				<div className="lg:flex-1 text-dark dark:text-light">
					<div className="flex mb-2 font-bold normal-case ml-2 text-3xl">
						<Image src={logo} alt="logo" width={75} height={75} />

						<div>
							<KalahFoundLogo w={180} h={60} />
						</div>
					</div>
					<p className="mb-4">Copyright © 2023 Kalah Foundation</p>
					<div className="flex gap-7">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler dark:text-light icon-tabler-brand-github"
							width="44"
							height="44"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
						</svg>{' '}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-brand-twitter dark:text-light "
							width="44"
							height="44"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-brand-youtube dark:text-light "
							width="44"
							height="44"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M3 5m0 4a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v6a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
							<path d="M10 9l5 3l-5 3z" />
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-brand-instagram dark:text-light"
							width="44"
							height="44"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
							<path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
							<path d="M16.5 7.5l0 .01" />
						</svg>
					</div>
				</div>

				<div className="lg:flex hidden justify-end">
					<ul className="flex flex-col">
						{MENU_LIST.map(item => {
							return (
								<li key={item.name}>
									<Link
										className="flex mb-2 justify-end normal-case font-bold text-xl text-dark dark:text-light"
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
		</footer>
	)
}

export default Footer
