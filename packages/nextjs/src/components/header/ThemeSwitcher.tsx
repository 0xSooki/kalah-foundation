import { useCallback } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

const ThemeSwitcher = ({ className = '' }) => {
	const { theme, setTheme } = useTheme()

	const toggleTheme = useCallback(() => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}, [theme, setTheme])

	return (
		<button
			onClick={toggleTheme}
			className={`${className} border-gray-300 dark:border-gray-800 text-dark dark:text-light`}
		>
			{theme === 'light' ? <MoonIcon className="w-8 h-8" /> : <SunIcon className="w-8 h-8" />}
		</button>
	)
}

export default ThemeSwitcher
