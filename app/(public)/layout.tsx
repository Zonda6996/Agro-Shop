import { Header } from '@/widgets/header/header'

export default function AppLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Header />
			<main className='min-h-screen mt-5 bg-background'>{children}</main>
		</>
	)
}
