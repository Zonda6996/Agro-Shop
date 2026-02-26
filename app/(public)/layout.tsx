import { Header } from '@/widgets/header/header'

export default function AppLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
			<div className='min-h-screen flex flex-col bg-background'>
				<Header />
				<main className='flex-1 mt-5 flex flex-col'>{children}</main>
			</div>
	)
}
