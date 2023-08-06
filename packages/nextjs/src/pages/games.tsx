import Header from '@/components/header/Header'
import React from 'react'

const Games = () => {
	return (
		<>
			<Header />
			<div className="relative min-h-screen flex bg-light dark:bg-dark flex-col  justify-between">
				<div className="mb-auto">
					<div className="mt-16 flex w-full flex-col gap-12 items-center justify-center">
						<h1 className="font-bold text-4xl text-dark dark:text-light">Active Games</h1>
					</div>
				</div>
			</div>
		</>
	)
}

export default Games
