'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface NavlinkProps {
	href: string
	children: ReactNode
	className?: string
	activeClassName?: string
}

export const Navlink = ({
	children,
	href,
	activeClassName = 'bg-primary text-primary-foreground shadow hover:bg-primary-hover',
	className = 'text-primary hover:bg-green-200/50',
}: NavlinkProps) => {
	const currentPath = usePathname()
	const isActive = currentPath === href

	return (
		<li>
			<Link
				href={href}
				className={clsx(
					'block rounded-full px-3 py-2 font-bold transition',
					className,
					{ [activeClassName]: isActive },
				)}
			>
				{children}
			</Link>
		</li>
	)
}
