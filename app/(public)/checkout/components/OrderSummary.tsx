'use client'

import { formatPrice } from '@/shared/lib/utils'
import {
	selectItems,
	selectTotalItems,
	selectTotalPrice,
} from '@/shared/store/cartSelectors'
import { useCartStore } from '@/shared/store/cartStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card'
import { Separator } from '@/shared/ui/separator'

const OrderSummary = () => {
	const items = useCartStore(selectItems)
	const totalItems = useCartStore(selectTotalItems)
	const total = useCartStore(selectTotalPrice)

	return (
		<Card className='sticky top-6'>
			<CardHeader>
				<CardTitle>Ваш заказ</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col gap-4'>
				{/* Список товаров */}
				<div className='flex flex-col gap-3'>
					{items.map(item => (
						<div key={item.id} className='flex justify-between text-sm'>
							<div className='flex flex-col'>
								<span className='font-medium'>{item.name}</span>
								<span className='text-gray-500 text-xs'>
									{item.quantity} шт × {formatPrice(item.price)} ₸
								</span>
							</div>
							<span className='font-medium'>
								{formatPrice(item.price * item.quantity)} ₸
							</span>
						</div>
					))}
				</div>

				<Separator className='bg-gray-200' />

				{/* Итого */}
				<div className='flex flex-col gap-2 text-sm'>
					<div className='flex justify-between'>
						<span className='text-gray-500'>Товары</span>
						<span>{totalItems} шт.</span>
					</div>
					<div className='flex justify-between'>
						<span className='text-gray-500'>Доставка</span>
						<span>По договорённости</span>
					</div>
				</div>

				<Separator className='bg-gray-200' />

				<div className='flex justify-between font-semibold text-lg'>
					<span>Итого</span>
					<span>{formatPrice(total)} ₸</span>
				</div>
			</CardContent>
		</Card>
	)
}

export default OrderSummary
