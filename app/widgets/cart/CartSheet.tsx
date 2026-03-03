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
} from 'lucide-react'
import { useCartStore } from '@/shared/store/cartStore'
import { Badge } from '@/shared/ui/badge'
import { Separator } from '@/shared/ui/separator'
import Link from 'next/link'
import { ROUTES } from '@/shared/lib/routes'
import { ShoppingCartGearIcon } from '@/shared/assets/icons/Icon'
import CartItem from './components/cartItem'
import { formatPrice } from '@/shared/lib/utils'
import {
	selectClearCart,
	selectItems,
	selectTotalItems,
	selectTotalPrice,
} from '@/shared/store/cartSelectors'

export const CartSheet = () => {
	const items = useCartStore(selectItems)
	const clearCart = useCartStore(selectClearCart)
	const totalItems = useCartStore(selectTotalItems)
	const total = useCartStore(selectTotalPrice)

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
					<Separator orientation='horizontal' className='mt-3 bg-gray-200' />
					{totalItems > 0 && (
						<Button
							size={'sm'}
							variant={'outline'}
							className='self-start mt-2'
							onClick={clearCart}
						>
							Очистить корзину
						</Button>
					)}
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
					<CartItem items={items} />
				</div>
				<SheetFooter>
					{totalItems > 0 && (
						<div className='flex justify-between px-1'>
							<span>Итого:</span>
							<span className='font-semibold'>{formatPrice(total)} ₸</span>
						</div>
					)}
					{totalItems > 0 && (
						<SheetClose asChild>
							<Link href={ROUTES.CART}>
								<Button className='w-full'>
									Перейти в корзину <MoveRightIcon />
								</Button>
							</Link>
						</SheetClose>
					)}
					<SheetClose asChild>
						<Button variant='outline'>Закрыть</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
