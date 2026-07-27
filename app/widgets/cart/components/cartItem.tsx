import { ROUTES } from '@/shared/lib/routes'
import { formatPrice } from '@/shared/lib/utils'
import {
	selectAddItem,
	selectDeleteItem,
	selectRemoveItem,
} from '@/shared/store/cartSelectors'
import { useCartStore, CartItemProps } from '@/shared/store/cartStore'
import { Button } from '@/shared/ui/button'
import { QuantityStepper } from '@/shared/ui/quantityStepper'
import { Separator } from '@/shared/ui/separator'
import { SheetClose } from '@/shared/ui/sheet'
import { Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface CartItem {
	items: CartItemProps[]
}

const CartItem = ({ items }: CartItem) => {
	const addItem = useCartStore(selectAddItem)
	const deleteItem = useCartStore(selectDeleteItem)
	const removeItem = useCartStore(selectRemoveItem)

	return (
		<>
			{items.map(p => (
				<div key={p.id}>
					<div className='grid grid-cols-3 gap-3 relative items-center'>
						{/* Фото */}
						<SheetClose asChild>
							<Link href={ROUTES.PRODUCT(p.id)}>
								<div className='relative aspect-square bg-gray-100 rounded-2xl overflow-hidden hover:scale-105 duration-200'>
									<Image
										src={p.image || '/placeholder.svg'}
										alt={p.name}
										fill
										sizes='(max-width: 1024px) 100vw, 50vw'
										className='object-cover '
									/>
								</div>
							</Link>
						</SheetClose>
						{/* название, цена за шт., цена общ */}
						<SheetClose asChild>
							<Link href={ROUTES.PRODUCT(p.id)} className='hover:underline'>
								<div>
									<span className='font-semibold'>
										{formatPrice(p.price * p.quantity)} ₸
									</span>
									<p className='font-light text-sm'>{p.name}</p>
									{p.quantity > 1 ? (
										<span className='text-gray-500 text-xs'>
											{formatPrice(p.price)} ₸/шт
										</span>
									) : (
										''
									)}
								</div>
							</Link>
						</SheetClose>

						{/* Счетчик */}
						<QuantityStepper
							quantity={p.quantity}
							onIncrease={() => addItem(p)}
							onDecrease={() => deleteItem(p.id)}
						/>

						{/* Удаление */}
						<div>
							<Button
								onClick={() => removeItem(p.id)}
								variant={'ghost'}
								size={'icon'}
								className='absolute -top-2 -right-2 hover:bg-foreground-hover'
							>
								<Trash2Icon className='w-5! h-5! stroke-1 text-red-500 ' />
							</Button>
						</div>
					</div>
					<Separator orientation='horizontal' className='bg-gray-200' />
				</div>
			))}
		</>
	)
}

export default CartItem
