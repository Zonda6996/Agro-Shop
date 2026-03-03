'use client'

import { useCartStore } from '@/shared/store/cartStore'
import { selectClearCart, selectItems, selectTotalItems } from '@/shared/store/cartSelectors'
import { CartItemRow } from './CartItemRow'
import { ShoppingCartGearIcon } from '@/shared/assets/icons/Icon'
import { Button } from '@/shared/ui/button'
import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from '@/shared/lib/routes'
import { Separator } from '@/shared/ui/separator'

export const CartList = () => {
	const items = useCartStore(selectItems)
	const totalItems = useCartStore(selectTotalItems)
	const clearCart = useCartStore(selectClearCart)

	if (totalItems < 1) {
		return (
			<div className='flex flex-col items-center justify-center gap-4 text-center py-20'>
				<ShoppingCartGearIcon size={120} className='text-gray-300' />
				<div>
					<p className='text-xl font-semibold'>Ваша корзина пуста</p>
					<p className='text-sm text-gray-500 mt-1'>
						Добавьте товары чтобы оформить заказ
					</p>
				</div>
				<Link href={ROUTES.PRODUCTS}>
					<Button size='lg'>
						К покупкам <ShoppingCartIcon />
					</Button>
				</Link>
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex justify-between items-center'>
				<h2 className='text-lg font-semibold'>
					Товары <sup className='text-gray-500 font-light'>{totalItems}</sup>
				</h2>
				<Button size='sm' variant='outline' onClick={clearCart}>
					Очистить корзину
				</Button>
			</div>
			<Separator className='bg-gray-200'/>

			<div className='flex flex-col gap-10'>
				{items.map(item => (
					<CartItemRow key={item.id} item={item} />
				))}
			</div>
		</div>
	)
}
