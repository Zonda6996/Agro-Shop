import { Button } from '@/shared/ui/button'
import { MoveRightIcon } from 'lucide-react'
import { ProductCardProps } from '@/api/products/types'

export const ProductCard = ({
	id,
	name,
	price,
	category,
	stock,
}: ProductCardProps) => {
	return (
		<div className='grid group relative rounded-3xl p-6 bg-linear-to-b from-white via-white to-gray-50 shadow-md transition-all hover:shadow-2xl hover:-translate-y-1 hover:scale-101 duration-300'>
			<div className='aspect-square bg-gray-100 rounded-2xl mb-5 flex items-center justify-center text-gray-400 font-semibold text-sm uppercase tracking-wide'>
				Фото скоро
			</div>

			<span className='text-xs text-gray-500 uppercase tracking-wider'>
				{category}
			</span>

			<div>
				<h3 className='font-bold text-lg mt-1 text-gray-900'>{name}</h3>
				<p className='text-sm text-gray-500'>{stock} шт.</p>
			</div>

			<div className='flex items-center justify-between mt-5'>
				<span className='text-xl font-extrabold text-gray-900'>{price} ₸</span>
				<Button
					size='sm'
					variant='default'
					className='group-hover:from-primary/90 group-hover:to-primary'
				>
					Подробнее
					<MoveRightIcon className='ml-2 h-4 w-4' />
				</Button>
			</div>
		</div>
	)
}
