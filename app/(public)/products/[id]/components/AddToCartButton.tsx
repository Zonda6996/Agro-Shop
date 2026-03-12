'use client'

import { selectAddItem, selectDeleteItem } from '@/shared/store/cartSelectors'
import { useCartStore } from '@/shared/store/cartStore'
import { Button } from '@/shared/ui/button'
import { QuantityStepper } from '@/shared/ui/quantityStepper'
import { ShoppingCartIcon } from 'lucide-react'

interface AddToCartButtonProps {
	id: number
	name: string
	price: number
	image?: string | null
}

export const AddToCartButton = ({
	id,
	name,
	price,
	image,
}: AddToCartButtonProps) => {
	const addItem = useCartStore(selectAddItem)
	const deleteItem = useCartStore(selectDeleteItem)
	const cartItem = useCartStore(state =>
		state.items.find(item => item.id === id),
	)

	if (cartItem) {
		return (
			<div className='flex-1'>
				<QuantityStepper
					quantity={cartItem.quantity}
					onIncrease={() => addItem(cartItem)}
					onDecrease={() => deleteItem(cartItem.id)}
					size='lg'
				/>
			</div>
		)
	}

	return (
		<Button
			size='lg'
			className='flex-1'
			onClick={() => addItem({ id, name, price, image })}
		>
			В корзину
			<ShoppingCartIcon className='h-5 w-5' />
		</Button>
	)
}
