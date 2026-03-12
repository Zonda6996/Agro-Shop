import { ROUTES } from '@/shared/lib/routes'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'

const partners = [
	{
		name: 'KazAgro',
		description: 'Крупнейший поставщик сельхозтехники в Казахстане',
	},
	{
		name: 'SeedPro',
		description: 'Элитные семена для профессиональных аграриев',
	},
	{
		name: 'AgroChim',
		description: 'Сертифицированные удобрения и средства защиты растений',
	},
	{
		name: 'FarmTech',
		description: 'Инновационное оборудование для современных хозяйств',
	},
	{
		name: 'GreenField',
		description: 'Экологичные решения для устойчивого земледелия',
	},
	{ name: 'StepAgro', description: 'Товары для животноводства и птицеводства' },
]

export const Partners = () => {
	return (
		<section id='partners' className='mt-20 mb-10'>
			<div className='text-center mb-10'>
				<p className='text-primary font-medium mb-2'>Партнёры</p>
				<h2 className='text-3xl font-bold'>Наши партнёры</h2>
				<p className='text-gray-500 mt-2'>
					Работаем только с проверенными поставщиками
				</p>
			</div>

			<div className='grid grid-cols-3 gap-6'>
				{partners.map(partner => (
					<div
						key={partner.name}
						className='flex flex-col gap-2 p-6 rounded-2xl border border-gray-200 bg-white hover:border-primary hover:shadow-md transition-all'
					>
						<div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2'>
							<span className='text-primary font-bold text-lg'>
								{partner.name[0]}
							</span>
						</div>
						<p className='font-semibold'>{partner.name}</p>
						<p className='text-sm text-gray-500'>{partner.description}</p>
					</div>
				))}
			</div>

			<div className='mt-10 text-center bg-primary/5 rounded-2xl p-10'>
				<h3 className='text-2xl font-bold mb-2'>Хотите стать партнёром?</h3>
				<p className='text-gray-500 mb-6'>
					Мы открыты к сотрудничеству с поставщиками качественных товаров
				</p>
				<Link href={`mailto:info@agrivia.kz`}>
					<Button size='lg'>Связаться с нами</Button>
				</Link>
			</div>
		</section>
	)
}
