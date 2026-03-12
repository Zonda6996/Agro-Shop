import { ROUTES } from '@/shared/lib/routes'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/logo/logo.svg'
import { Navlink } from '@/shared/ui/navlink'
import { CartSheet } from '../cart/cartSheet'
import UserButton from './UserButton'

export const Header = () => {
	return (
		<header className='w-full bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50'>
			<div className='container mx-auto px-6 py-4 flex justify-between items-center gap-8'>
				<Link href={ROUTES.HOME}>
					<Image
						src={Logo}
						alt='Logo'
						width={120}
						height={40}
						loading='eager'
					/>
				</Link>
				<nav>
					<ul className='flex items-center gap-8 border border-gray-200 rounded-full px-4 py-2'>
						<Navlink href={ROUTES.HOME}>Главная</Navlink>
						<Navlink href={ROUTES.PRODUCTS}>Ассортимент</Navlink>
						<Navlink href={ROUTES.CART}>Корзина</Navlink>
						<Navlink href='/#partners'>Партнёры</Navlink>
						<Navlink href='/#about'>О нас</Navlink>
					</ul>
				</nav>
				<div className='flex gap-2 items-center font-medium rounded-full '>
					<CartSheet />
					<UserButton />
				</div>
			</div>
		</header>
	)
}
