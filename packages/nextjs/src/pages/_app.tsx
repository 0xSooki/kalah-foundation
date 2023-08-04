import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'
import Provider from '@/components/shared/Provider'

const App = ({ Component, pageProps }) => {
	return (
		<ThemeProvider attribute="class">
			<Provider>
				<Component {...pageProps} />
			</Provider>
		</ThemeProvider>
	)
}

export default App
