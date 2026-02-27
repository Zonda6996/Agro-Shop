'use client'

import { Button } from '@/shared/ui/button'
import { MoveRightIcon, ShoppingCartIcon } from 'lucide-react'
import { Badge } from '@/shared/ui/badge'
import Link from 'next/link'
import { ROUTES } from '@/shared/lib/routes'
import { useCartStore } from '@/shared/store/cartStore'
import { SerializedProduct } from '@/shared/types'

export const ProductCard = ({
	id,
	name,
	price,
	stock,
	image,
	category,
	isFeatured,
}: SerializedProduct) => {
	const finalPrice = isFeatured ? Number(price) * 0.75 : Number(price)
	const addItem = useCartStore(state => state.addItem)

	return (
		<div className='grid group relative rounded-3xl p-4 bg-linear-to-b from-white via-white to-gray-50 shadow-md transition-all hover:shadow-2xl hover:-translate-y-1 hover:scale-101 duration-300'>
			<Link href={ROUTES.PRODUCT(id)}>
				<div className='aspect-square bg-gray-100 rounded-2xl mb-5 flex items-center justify-center text-gray-400 font-semibold text-sm uppercase tracking-wide'>
					Фото скоро
				</div>
			</Link>

			<span className='text-xs text-gray-500 uppercase tracking-wider'>
				{category.name}
			</span>

			<div className='flex flex-col gap-3'>
				<div className='min-h-20 mt-3 '>
					<h3 className=' text-gray-900'>{name}</h3>

					<div className='flex items-center gap-3'>
						<span className='text-xl font-semibold text-gray-900'>
							{finalPrice.toFixed(0)} ₸
						</span>
						{isFeatured && (
							<Badge className='bg-blue-200 text-blue-700 dark:bg-blue-950 dark:text-blue-300'>
								Скидка 25%
							</Badge>
						)}
					</div>

					{isFeatured && (
						<span className='text-sm text-gray-500 line-through'>
							{price.toString()} ₸
						</span>
					)}
				</div>

				{stock < 5 ? (
					<Badge variant={'destructive'}>Осталось мало</Badge>
				) : (
					<Badge variant={'default'}>В наличии</Badge>
				)}
			</div>

			<div className='flex items-center justify-between mt-3'>
				<Link href={ROUTES.PRODUCT(id)}>
					<Button
						size='sm'
						variant='secondary'
						className='max-w-29 hover:bg-gray-200'
					>
						Подробнее
						<MoveRightIcon className='ml-2 h-4 w-4' />
					</Button>
				</Link>
				<Button
					className='w-1/2'
					size={'sm'}
					variant={'default'}
					onClick={() => addItem({ id, name, price: finalPrice, image })}
				>
					В корзину
					<ShoppingCartIcon className='ml-2 h-4 w-4' />
				</Button>
			</div>
		</div>
	)
}
