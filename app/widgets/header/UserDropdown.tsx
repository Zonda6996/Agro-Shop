'use client'

import { ROUTES } from '@/shared/lib/routes'
import { Button } from '@/shared/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { LogOutIcon, ShoppingBagIcon, UserIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

interface UserDropdownProps {
	name?: string | null
	email?: string | null
}

const UserDropdown = ({ name, email }: UserDropdownProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='flex items-center gap-2'>
					<UserIcon />
					{name ?? email}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-48 ' align='end'>
				<DropdownMenuGroup>
					<DropdownMenuLabel>
						<p className='font-medium'>{name}</p>
						<p className='text-xs text-gray-500 font-normal'>{email}</p>
					</DropdownMenuLabel>
					<DropdownMenuItem className='cursor-pointer'>
						<Link href={ROUTES.ACCOUNT} className='flex items-center gap-2'>
							<ShoppingBagIcon />
							Мои заказы
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className='text-red-500 cursor-pointer focus:text-red-500'
						onClick={() => signOut({ redirectTo: ROUTES.HOME })}
					>
						<LogOutIcon className='text-red-500' />
						Выйти
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserDropdown
