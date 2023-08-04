import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'
import Provider from '@/components/shared/Provider'
import Header from '@/components/shared/Header'

const App = ({ Component, pageProps }) => {
	return (
		<ThemeProvider attribute="class">
			<Provider>
				<div className="flex flex-col min-h-screen">
					<Header />
					<main className="">
						<Component {...pageProps} />
					</main>
				</div>
			</Provider>
		</ThemeProvider>
	)
}

export default App
