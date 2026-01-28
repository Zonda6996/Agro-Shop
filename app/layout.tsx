import type { Metadata } from 'next'
import './globals.css'
import { inter, poppins } from './shared/ui/fonts/fonts'

export const metadata: Metadata = {
	title: 'Agro Shop',
	description: 'Agro shop built with Next.js and Tailwind CSS',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.variable} ${poppins.variable} antialiased`}>
				{children}
			</body>
		</html>
	)
}
