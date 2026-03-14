'use client'

import { navLinks } from '@/shared/lib/navigation'
import { ROUTES } from '@/shared/lib/routes'
import { Button } from '@/shared/ui/button'
import { Separator } from '@/shared/ui/separator'
import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface MobileMenuProps {
	isLoggedIn: boolean
}

const MobileMenu = ({ isLoggedIn }: MobileMenuProps) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Button
				variant={'ghost'}
				size={'icon'}
				onClick={() => setIsOpen(prev => !prev)}
			>
				{isOpen ? (
					<XIcon className='w-6! h-6!' />
				) : (
					<MenuIcon className='w-6! h-6!' />
				)}
			</Button>

			{isOpen && (
				<div className='lg:hidden absolute top-full left-0 right-0 bg-white px-6 py-4 flex flex-col gap-1 shadow-md'>
					{!isLoggedIn && (
						<div className='flex gap-3 mb-3'>
							<Link
								href={ROUTES.LOGIN}
								className='flex-1 text-center py-2 px-4 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition'
							>
								Войти
							</Link>
							<Link
								href={ROUTES.REGISTER}
								className='flex-1 text-center py-2 px-4 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition'
							>
								Регистрация
							</Link>
						</div>
					)}
					<Separator className='bg-gray-200' />

					{navLinks.map(link => (
						<Link
							key={link.href}
							href={link.href}
							onClick={() => setIsOpen(false)}
							className='py-3 px-4 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors'
						>
							{link.label}
						</Link>
					))}
				</div>
			)}
		</>
	)
}

export default MobileMenu
