import 'tailwindcss/tailwind.css'
import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/header/Header'

const App = ({ Component, pageProps }) => {
	return (
		<ThemeProvider attribute="class">
			<div className="flex flex-col min-h-screen">
				<Header />
				<main className="">
					<Component {...pageProps} />
				</main>
			</div>
		</ThemeProvider>
	)
}

export default App
