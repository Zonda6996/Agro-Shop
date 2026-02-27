'use client'

import { Button } from '@/shared/ui/button'
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetFooter,
	SheetClose,
} from '@/shared/ui/sheet'
import {
	MoveRightIcon,
	ShoppingBasketIcon,
	ShoppingCartIcon,
	Trash2Icon,
} from 'lucide-react'
import { useCartStore } from '@/shared/store/cartStore'
import { Badge } from '@/shared/ui/badge'
import { Separator } from '@/shared/ui/separator'
import Link from 'next/link'
import { ROUTES } from '@/shared/lib/routes'
import { ShoppingCartGearIcon } from '@/shared/assets/icons/Icon'

export const CartSheet = () => {
	const items = useCartStore(state => state.items)
	const addItem = useCartStore(state => state.addItem)
	const deleteItem = useCartStore(state => state.deleteItem)
	const removeItem = useCartStore(state => state.removeItem)
	const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
	const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className='relative' size={'icon'} variant={'ghost'}>
					<ShoppingBasketIcon className='w-6! h-6!' />
					{totalItems > 0 && (
						<Badge className='absolute -top-1 -right-1 px-1 py-0'>
							{totalItems}
						</Badge>
					)}
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>
						Корзина <span>{totalItems > 0 ? `(${totalItems})` : ''}</span>
					</SheetTitle>
					<SheetDescription>
						{totalItems > 0
							? 'Проверьте выбранные товары перед оформлением:'
							: ''}
					</SheetDescription>
					<Separator orientation='horizontal' className='mt-3' />
				</SheetHeader>
				<div className='flex flex-col flex-1 gap-6 px-4 overflow-y-auto'>
					{totalItems < 1 && (
						<div className='flex flex-1 flex-col items-center justify-center gap-4 text-center'>
							<ShoppingCartGearIcon size={120} className='text-gray-300' />
							<div>
								<p className='text-xl font-semibold'>Ваша корзина пуста</p>
								<p className='text-sm text-gray-500 mt-1'>
									Добавьте товары чтобы оформить заказ
								</p>
							</div>
							<SheetClose asChild>
								<Link href={ROUTES.PRODUCTS}>
									<Button size='lg'>
										К покупкам <ShoppingCartIcon />
									</Button>
								</Link>
							</SheetClose>
						</div>
					)}

					{items.map(p => (
						<div key={p.id}>
							{/* Фото */}
							<div className='grid grid-cols-3 gap-3 relative place items-center'>
								<div className='aspect-square border bg-gray-100 rounded-2xl mb-5 flex items-center justify-center text-gray-400 text-xs uppercase tracking-wide'>
									Фото скоро
								</div>
								{/* название, цена за шт., цена общ */}
								<div>
									<span className='font-semibold'>
										{p.price * p.quantity} ₸
									</span>
									<p className='font-light text-sm'>{p.name}</p>
									{p.quantity > 1 ? (
										<span className='text-gray-500 text-xs'>
											{p.price} ₸/шт
										</span>
									) : (
										''
									)}
								</div>

								{/* Счетчик */}
								<div className='flex items-center justify-center gap-2'>
									<Button
										onClick={() => deleteItem(p.id)}
										variant={'outline'}
										size={'xs'}
									>
										-
									</Button>
									<span className='bg-gray-200 py-0.5 px-3 rounded-md'>
										{p.quantity}
									</span>
									<Button
										onClick={() => addItem(p)}
										variant={'outline'}
										size={'xs'}
									>
										+
									</Button>
								</div>

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
							<Separator orientation='horizontal' />
						</div>
					))}
				</div>
				<SheetFooter>
					<div className='flex justify-between font-semibold px-1'>
						<span>Итого:</span>
						<span>{total.toFixed(0)} ₸</span>
					</div>
					<Link href={ROUTES.CART}>
						<Button className='w-full'>
							Перейти в корзину <MoveRightIcon />
						</Button>
					</Link>
					<SheetClose asChild>
						<Button variant='outline'>Закрыть</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
