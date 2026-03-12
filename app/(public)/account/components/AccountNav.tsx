'use client'

import { ROUTES } from '@/shared/lib/routes'
import clsx from 'clsx'
import { ClipboardListIcon, HeartIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
	{ href: ROUTES.ACCOUNT_PROFILE, label: 'Профиль', icon: UserIcon },
	{ href: ROUTES.ACCOUNT_FAVORITES, label: 'Избранное', icon: HeartIcon },
	{
		href: ROUTES.ACCOUNT_ORDERS,
		label: 'Мои заказы',
		icon: ClipboardListIcon,
	},
]

const AccountNav = () => {
	const pathname = usePathname()

	return (
		<nav className='flex flex-col gap-1'>
			{navItems.map(({ href, label, icon: Icon }) => {
				const isActive = pathname === href

				return (
					<Link
						key={href}
						href={href}
						className={clsx(
							'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
							isActive
								? 'bg-primary text-primary-foreground'
								: 'text-gray-600 hover:bg-gray-100 hover:text-foreground',
						)}
					>
						<Icon className='w-4 h-4' />
						{label}
					</Link>
				)
			})}
		</nav>
	)
}

export default AccountNav
