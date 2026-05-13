import { auth } from '@/shared/lib/auth'
import { ROUTES } from '@/shared/lib/routes'
import {
	ArrowLeftIcon,
	LayoutDashboardIcon,
	PackageIcon,
	ShoppingCartIcon,
	UsersIcon,
} from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const navItems = [
	{ href: '/admin', label: 'Дашборд', icon: LayoutDashboardIcon },
	{ href: '/admin/products', label: 'Товары', icon: PackageIcon },
	{ href: '/admin/orders', label: 'Заказы', icon: ShoppingCartIcon },
	{ href: '/admin/users', label: 'Пользователи', icon: UsersIcon },
]

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await auth()

	if (session?.user.role !== 'ADMIN') {
		redirect(ROUTES.HOME)
	}

	return (
		<div className='min-h-screen flex'>
			<aside className='w-64 bg-gray-950 text-white flex flex-col'>
				<div className=' p-6 border-b border-gray-800'>
					<p className='font-bold text-lg'>Agrivia Admin</p>
					<p className='text-gray-400 text-sm mt-1'>{session.user.email}</p>
				</div>
				<nav className='flex flex-col gap-1 p-4'>
					{navItems.map(({ href, label, icon: Icon }) => (
						<Link
							key={href}
							href={href}
							className='flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors'
						>
							<Icon className='w-4 h-4' />
							{label}
						</Link>
					))}
				</nav>
			</aside>

			<main className='flex-1 bg-gray-100 p-8'>
				<Link
					href={ROUTES.HOME}
					className='flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit mb-1'
				>
					<ArrowLeftIcon className='w-4 h-4' />
					На главную Agrivia
				</Link>
				{children}
			</main>
		</div>
	)
}
