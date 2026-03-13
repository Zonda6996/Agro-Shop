'use client'

import { useCartStore, CartItemProps } from '@/shared/store/cartStore'
import {
	selectAddItem,
	selectDeleteItem,
	selectRemoveItem,
} from '@/shared/store/cartSelectors'
import { Button } from '@/shared/ui/button'
import { Trash2Icon } from 'lucide-react'
import { formatPrice } from '@/shared/lib/utils'
import Link from 'next/link'
import { ROUTES } from '@/shared/lib/routes'
import { QuantityStepper } from '@/shared/ui/quantityStepper'

interface CartItemRowProps {
	item: CartItemProps
}

export const CartItemRow = ({ item }: CartItemRowProps) => {
	const addItem = useCartStore(selectAddItem)
	const deleteItem = useCartStore(selectDeleteItem)
	const removeItem = useCartStore(selectRemoveItem)

return (
	<div className='flex flex-col gap-3'>
		<div className='flex gap-4 items-center'>
			{/* Фото */}
			<Link href={ROUTES.PRODUCT(item.id)} className='shrink-0'>
				<div className='w-20 h-20 border bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-xs uppercase tracking-wide'>
					Фото
				</div>
			</Link>

			{/* Основной контент */}
			<div className='flex flex-1 flex-col gap-2 min-w-0'>
				{/* Название + цена */}
				<div className='flex justify-between items-start gap-2'>
					<Link
						href={ROUTES.PRODUCT(item.id)}
						className='hover:underline text-sm font-medium leading-tight'
					>
						{item.name}
					</Link>
					<span className='font-semibold text-sm shrink-0'>
						{formatPrice(item.price * item.quantity)} ₸
					</span>
				</div>

				{/* Счётчик + удалить */}
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<QuantityStepper
							quantity={item.quantity}
							onIncrease={() => addItem(item)}
							onDecrease={() => deleteItem(item.id)}
						/>
						{item.quantity > 1 && (
							<p className='text-xs text-gray-500'>
								{formatPrice(item.price)} ₸/шт
							</p>
						)}
					</div>
					<Button
						onClick={() => removeItem(item.id)}
						variant='ghost'
						size='icon'
						className='hover:bg-red-50'
					>
						<Trash2Icon className='w-4 h-4 text-red-500' />
					</Button>
				</div>
			</div>
		</div>
	</div>
)
}
