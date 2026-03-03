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
			<div className='grid grid-cols-6 gap-4'>
				{/* Фото */}
				<Link href={ROUTES.PRODUCT(item.id)} className='col-span-1'>
					<div className='aspect-square border bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-xs uppercase tracking-wide'>
						Фото
					</div>
				</Link>

				{/* Название и удаление */}
				<div className='col-span-2 flex flex-col h-full'>
					<Link href={ROUTES.PRODUCT(item.id)} className='hover:underline'>
						{item.name}
					</Link>
					{item.quantity > 1 && (
						<p className='text-xs text-gray-500 mt-1'>
							{formatPrice(item.price)} ₸/шт
						</p>
					)}
					<Button
						onClick={() => removeItem(item.id)}
						variant='ghost'
						size='icon'
						className='mt-auto hover:bg-red-50'
					>
						<Trash2Icon className='w-5! h-5! text-red-500' />
					</Button>
				</div>

				{/* Счётчик */}
				<div className='col-span-2 flex flex-col justify-between items-center h-full'>
					<QuantityStepper
						quantity={item.quantity}
						onIncrease={() => addItem(item)}
						onDecrease={() => deleteItem(item.id)}
					/>
				</div>

				{/* Цена */}
				<div className='col-span-1 flex flex-col items-end gap-1'>
					<span className='font-semibold'>
						{formatPrice(item.price * item.quantity)} ₸
					</span>
				</div>
			</div>
		</div>
	)
}
