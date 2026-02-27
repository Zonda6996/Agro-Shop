'use client'

import { useCartStore } from '@/shared/store/cartStore'
import { Button } from '@/shared/ui/button'
import { ShoppingCartIcon } from 'lucide-react'

interface AddtoCartButtonProps {
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
}: AddtoCartButtonProps) => {
	const addItem = useCartStore(state => state.addItem)

	return (
		<Button
			size='lg'
			className='flex-1'
			onClick={() => addItem({ id, name, price, image })}
		>
			В корзину
			<ShoppingCartIcon className='mr-2 h-5 w-5' />
		</Button>
	)
}
