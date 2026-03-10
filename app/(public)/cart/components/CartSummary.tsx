'use client'

import { useCartStore } from '@/shared/store/cartStore'
import {
	selectTotalItems,
	selectTotalPrice,
} from '@/shared/store/cartSelectors'
import { Button } from '@/shared/ui/button'
import { Separator } from '@/shared/ui/separator'
import { formatPrice } from '@/shared/lib/utils'
import { MoveRightIcon } from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from '@/shared/lib/routes'

export const CartSummary = () => {
	const totalItems = useCartStore(selectTotalItems)
	const total = useCartStore(selectTotalPrice)

	return (
		<>
			{totalItems > 0 && (
				<div className='bg-white rounded-2xl p-6 flex flex-col gap-4 sticky top-6 border'>
					<h2 className='text-lg font-semibold'>Итого</h2>

					<div className='flex flex-col gap-2 text-sm'>
						<div className='flex justify-between'>
							<span className='text-gray-500'>Товары</span>
							<span>{totalItems} шт.</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-gray-500'>Сумма</span>
							<span>{formatPrice(total)} ₸</span>
						</div>
					</div>

					<Separator className='bg-gray-200' />

					<div className='flex justify-between font-semibold text-lg'>
						<span>К оплате</span>
						<span>{formatPrice(total)} ₸</span>
					</div>

					<Link href={ROUTES.CHECKOUT}>
						<Button className='w-full' size='lg' disabled={totalItems < 1}>
							Оформить заказ <MoveRightIcon />
						</Button>
					</Link>
				</div>
			)}
		</>
	)
}
