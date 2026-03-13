import { Button } from '@/shared/ui/button'
import { LeafIcon, ShieldCheckIcon, TruckIcon } from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from '@/shared/lib/routes'

const advantages = [
	{
		icon: ShieldCheckIcon,
		title: 'Качество',
		description: 'Только сертифицированные товары от проверенных поставщиков',
	},
	{
		icon: TruckIcon,
		title: 'Доставка',
		description: 'Быстрая доставка по всему Казахстану',
	},
	{
		icon: LeafIcon,
		title: 'Экспертиза',
		description: 'Более 5 лет опыта в сфере сельского хозяйства',
	},
]

export const About = () => {
	return (
		<section id='about' className='mt-20'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
				{/* Текст */}
				<div className='flex flex-col gap-6'>
					<div>
						<p className='text-primary font-medium mb-2'>О компании</p>
						<h2 className='text-3xl font-bold'>
							Agrivia — ваш надёжный партнёр в агробизнесе
						</h2>
					</div>
					<p className='text-gray-500 leading-relaxed'>
						Мы помогаем фермерам и сельхозпредприятиям Казахстана получать
						доступ к качественным товарам — от семян и удобрений до техники и
						инструментов. Наша миссия — сделать агробизнес эффективнее и
						прибыльнее.
					</p>
					<div className='flex flex-col gap-4'>
						{advantages.map(({ icon: Icon, title, description }) => (
							<div key={title} className='flex items-start gap-4'>
								<div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0'>
									<Icon className='w-5 h-5 text-primary' />
								</div>
								<div>
									<p className='font-semibold'>{title}</p>
									<p className='text-sm text-gray-500'>{description}</p>
								</div>
							</div>
						))}
					</div>
					<Link href={ROUTES.PRODUCTS} className='w-fit'>
						<Button size='lg'>Перейти в каталог</Button>
					</Link>
				</div>

				{/* Карточки со статистикой */}
				<div className='grid grid-cols-2 gap-4'>
					<div className='bg-primary rounded-2xl p-8 text-primary-foreground flex flex-col gap-2'>
						<p className='text-5xl font-bold'>5+</p>
						<p className='text-primary-foreground/80'>лет на рынке</p>
					</div>
					<div className='bg-gray-100 rounded-2xl p-8 flex flex-col gap-2'>
						<p className='text-5xl font-bold'>500+</p>
						<p className='text-gray-500'>довольных клиентов</p>
					</div>
					<div className='bg-gray-100 rounded-2xl p-8 flex flex-col gap-2'>
						<p className='text-5xl font-bold'>8+</p>
						<p className='text-gray-500'>категорий товаров</p>
					</div>
					<div className='bg-gray-950 rounded-2xl p-8 text-white flex flex-col gap-2'>
						<p className='text-5xl font-bold'>16+</p>
						<p className='text-gray-400'>товаров в каталоге</p>
					</div>
				</div>
			</div>
		</section>
	)
}
