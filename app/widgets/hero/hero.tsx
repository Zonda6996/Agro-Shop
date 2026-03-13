import { Button } from '@/shared/ui/button'
import Image from 'next/image'
import twoTractorsImg from '../../../public/images/two-tractors.webp'
import Link from 'next/link'
import { ROUTES } from '@/shared/lib/routes'
import { SparklesIcon, TagIcon, TrendingUpIcon } from 'lucide-react'

const banners = [
	{
		icon: SparklesIcon,
		label: 'Новинки',
		description: 'Свежие поступления',
		href: ROUTES.PRODUCTS,
		className: 'bg-emerald-50 border-emerald-200 text-emerald-700',
		iconClass: 'text-emerald-500',
	},
	{
		icon: TagIcon,
		label: 'Скидки',
		description: 'До 25% на товары',
		href: ROUTES.PRODUCTS,
		className: 'bg-orange-50 border-orange-200 text-orange-700',
		iconClass: 'text-orange-500',
	},
	{
		icon: TrendingUpIcon,
		label: 'Популярное',
		description: 'Лидеры продаж',
		href: ROUTES.PRODUCTS,
		className: 'bg-blue-50 border-blue-200 text-blue-700',
		iconClass: 'text-blue-500',
	},
]

export const Hero = () => {
	return (
		<section className='flex flex-col gap-4'>
			{/* Картинка */}
			<div className='relative h-100 lg:h-140 w-full rounded-2xl overflow-hidden'>
				<Image
					className='rounded-2xl object-cover'
					src={twoTractorsImg}
					alt='Combine'
					priority
					fill
				/>
				<div className='absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent rounded-2xl' />

				<div className='absolute inset-0 flex flex-col items-start justify-center px-16 gap-4'>
					<p className='text-white font-bold sm:text-4xl text-3xl drop-shadow-lg'>
						Надёжные решения для агробизнеса
					</p>
					<p className='text-white/80 sm:text-lg text-md font-light drop-shadow'>
						Всё для посева, ухода и роста вашего хозяйства
					</p>
					<Link href={ROUTES.PRODUCTS}>
						<Button size='lg' className='mt-2'>
							Перейти в каталог
						</Button>
					</Link>
				</div>

				{/* Баннеры внутри — только десктоп */}
				<div className='absolute bottom-0 left-0 right-0 hidden lg:grid grid-cols-3 gap-3 p-4'>
					{banners.map(({ icon: Icon, label, description, href }) => (
						<Link key={label} href={href}>
							<div className='flex items-center gap-3 px-3 py-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all cursor-pointer'>
								<div className='w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0'>
									<Icon className='w-4 h-4 text-white' />
								</div>
								<div>
									<p className='font-semibold text-sm text-white'>{label}</p>
									<p className='text-xs text-white/70'>{description}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>

			{/* Баннеры под картинкой — только мобильный */}
			<div className='grid grid-cols-3 gap-3 lg:hidden'>
				{banners.map(({ icon: Icon, label, href, className, iconClass }) => (
					<Link key={label} href={href}>
						<div
							className={`flex flex-col items-center gap-2 p-3 rounded-2xl border text-center cursor-pointer hover:shadow-md transition-all ${className}`}
						>
							<Icon className={`w-5 h-5 ${iconClass}`} />
							<p className='font-semibold text-xs'>{label}</p>
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}
