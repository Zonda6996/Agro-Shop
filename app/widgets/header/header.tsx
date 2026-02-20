import { ROUTES } from '@/shared/lib/routes'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/logo/logo.svg'
import { Separator } from '@/shared/ui/separator'
import { Navlink } from '@/shared/ui/navlink'

export const Header = () => {
	return (
		<header className='w-full bg-white/90 shadow-sm'>
			<div className='container mx-auto px-6 py-4 flex justify-between items-center'>
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
					<ul className='flex items-center gap-3 p-1 rounded-full bg-green-100/50 shadow-sm'>
						<Navlink href={ROUTES.HOME}>Главная</Navlink>
						<Navlink href={ROUTES.PRODUCTS}>Ассортимент</Navlink>
						<Navlink href='/catalog'>Каталог</Navlink>
						<Navlink href='/partners'>Партнёры</Navlink>
						<Navlink href='/about'>О нас</Navlink>
					</ul>
				</nav>
				<div className=' flex gap-3 items-center font-medium rounded-full '>
					<Link
						className='py-1.5 px-2 rounded-full hover:bg-foreground-hover transition'
						href={'/'}
					>
						Войти
					</Link>
					<Separator className='w-[0.8px]! h-4' orientation='vertical' />
					<Link
						className='py-1.5 px-2 rounded-full hover:bg-foreground-hover transition'
						href={'/'}
					>
						Регистрация
					</Link>
				</div>
			</div>
		</header>
	)
}
