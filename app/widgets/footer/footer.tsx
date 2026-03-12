import { ROUTES } from '@/shared/lib/routes'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../../public/logo/logo.svg'

export const Footer = () => {
	return (
		<footer className='bg-gray-950 text-gray-400 mt-20'>
			<div className='container mx-auto px-6 py-8'>
				<div className='grid grid-cols-4 gap-8'>
					{/* Лого и описание */}
					<div className='flex flex-col gap-4'>
						<Image
							src={Logo}
							alt='Agrivia'
							width={100}
							height={32}
							className='brightness-0 invert'
						/>
						<p className='text-sm'>
							Надёжные решения для агробизнеса. Качественные товары для посева,
							ухода и роста.
						</p>
					</div>

					{/* Навигация */}
					<div className='flex flex-col gap-3'>
						<p className='text-white font-semibold mb-1'>Навигация</p>
						<Link
							href={ROUTES.HOME}
							className='text-sm hover:text-white transition-colors'
						>
							Главная
						</Link>
						<Link
							href={ROUTES.PRODUCTS}
							className='text-sm hover:text-white transition-colors'
						>
							Ассортимент
						</Link>
						<Link
							href={ROUTES.CART}
							className='text-sm hover:text-white transition-colors'
						>
							Корзина
						</Link>
					</div>

					{/* Аккаунт */}
					<div className='flex flex-col gap-3'>
						<p className='text-white font-semibold mb-1'>Аккаунт</p>
						<Link
							href={ROUTES.ACCOUNT_ORDERS}
							className='text-sm hover:text-white transition-colors'
						>
							Мои заказы
						</Link>
						<Link
							href={ROUTES.ACCOUNT_PROFILE}
							className='text-sm hover:text-white transition-colors'
						>
							Профиль
						</Link>
						<Link
							href={ROUTES.ACCOUNT_FAVORITES}
							className='text-sm hover:text-white transition-colors'
						>
							Избранное
						</Link>
					</div>

					{/* Контакты */}
					<div className='flex flex-col gap-3'>
						<p className='text-white font-semibold mb-1'>Контакты</p>
						<p className='text-sm'>г. Астана, ул. Складская, 15</p>
						<p className='text-sm'>+7 777 123 45 67</p>
						<p className='text-sm'>info@agrivia.kz</p>
					</div>
				</div>

				<div className='border-t border-gray-800 mt-10 pt-6 flex justify-between items-center text-sm'>
					<p>© 2025 Agrivia. Все права защищены.</p>
					<p>Сделано с ❤️ для агробизнеса</p>
				</div>
			</div>
		</footer>
	)
}
