import { ROUTES } from '@/shared/lib/routes'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/logo/logo.svg'
import { Navlink } from '@/shared/ui/navlink'
import { CartSheet } from '../cart/CartSheet'
import UserButton from './components/UserButton'
import { navLinks } from '@/shared/lib/navigation'
import MobileMenu from './components/MobileMenu'
import { auth } from '@/shared/lib/auth'
import { Separator } from '@/shared/ui/separator'

export const Header = async () => {
	const session = await auth()
	console.log(session?.user?.role)

	return (
		<header className='w-full bg-white/80 backdrop-blur-md shadow-sm lg:sticky static top-0 z-50'>
			<div className='relative w-full px-4 py-2 lg:py-4 flex justify-between items-center gap-4'>
				<Link href={ROUTES.HOME} className='flex-1 lg:flex-none'>
					<Image
						src={Logo}
						alt='Logo'
						width={120}
						height={40}
						loading='eager'
					/>
				</Link>

				<nav>
					<ul className='lg:flex items-center gap-8 border border-gray-200 rounded-full px-4 py-2 hidden'>
						{navLinks.map(link => (
							<Navlink key={link.href} href={link.href}>
								{link.label}
							</Navlink>
						))}
					</ul>
				</nav>

				<div className='hidden lg:flex gap-2 items-center font-medium'>
					<CartSheet />
					{session ? (
						<UserButton />
					) : (
						<div className='flex gap-3 items-center'>
							<Link
								className='py-1.5 px-2 rounded-full hover:bg-gray-100 transition text-sm font-medium'
								href={ROUTES.LOGIN}
							>
								Войти
							</Link>
							<Separator className='w-[0.8px]! h-4!' orientation='vertical' />
							<Link
								className='py-1.5 px-2 rounded-full hover:bg-gray-100 transition text-sm font-medium'
								href={ROUTES.REGISTER}
							>
								Регистрация
							</Link>
						</div>
					)}
				</div>

				<div className='flex lg:hidden gap-2 items-center'>
					<UserButton />
					<CartSheet />
					<MobileMenu isLoggedIn={!!session} />
				</div>
			</div>
		</header>
	)
}
