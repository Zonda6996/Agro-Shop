import clsx from 'clsx'
import { ReactNode } from 'react'

interface ContainerProps {
	children: ReactNode
	className?: string
	fullWidth?: boolean
}

export const Container = ({
	children,
	className = '',
	fullWidth = false,
}: ContainerProps) => {
	return (
		<div
			className={clsx(
				fullWidth
					? 'flex flex-col w-full px-6'
					: 'flex flex-col container mx-auto px-6',
				className,
			)}
		>
			{children}
		</div>
	)
}
