'use client'

import { ROUTES } from '@/shared/lib/routes'
import { Container } from '@/widgets/container/container'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { CartList } from './components/CartList'
import { CartSummary } from './components/CartSummary'
import { useCartStore } from '@/shared/store/cartStore'
import { selectTotalItems } from '@/shared/store/cartSelectors'
import clsx from 'clsx'

const CartPage = () => {
	const totalItems = useCartStore(selectTotalItems)

	return (
		<Container>
			<Link
				href={ROUTES.PRODUCTS}
				className='flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit mt-4'
			>
				<ArrowLeftIcon className='w-4 h-4' />
				Продолжить покупки
			</Link>

			<h1 className='text-3xl font-bold mt-6'>Корзина</h1>

			<div className='grid lg:grid-cols-3 grid-cols-1 gap-8 mt-6'>
				<div
					className={clsx(
						'bg-white rounded-2xl p-6',
						totalItems > 0 ? 'lg:col-span-2' : 'lg:col-span-3',
					)}
				>
					<CartList />
				</div>

				<div className='lg:col-span-1 '>
					<CartSummary />
				</div>
			</div>
		</Container>
	)
}

export default CartPage
