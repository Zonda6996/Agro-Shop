'use client'

import { navLinks } from '@/shared/lib/navigation'
import { Button } from '@/shared/ui/button'
import { Separator } from '@/shared/ui/separator'
import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const MobileMenu = () => {
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
