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
	activeClassName = 'text-primary font-bold! relative after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[1.5px] after:bg-primary after:rounded-full',
	className = 'text-gray-500 hover:text-gray-900',
}: NavlinkProps) => {
	const currentPath = usePathname()
	const isActive = currentPath === href

	return (
		<li>
			<Link
				href={href}
				className={clsx(
					'relative font-medium transition-colors',
					isActive ? activeClassName : className,
				)}
			>
				{children}
			</Link>
		</li>
	)
}
