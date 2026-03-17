import { auth } from '@/shared/lib/auth'
import { SkeletonOrders } from './components/SkeletonOrders'
import { Suspense } from 'react'
import OrdersList from './components/OrdersList'

const OrdersPage = async () => {
	const session = await auth()

	return (
		<div className='flex flex-col gap-4'>
			<h2 className='text-lg font-semibold heading'>Мои заказы</h2>
			<Suspense
				fallback={
					<div className='flex flex-col gap-3'>
						{Array.from({ length: 3 }).map((_, index) => (
							<SkeletonOrders key={index} />
						))}
					</div>
				}
			>
				<OrdersList userId={Number(session?.user.id)} />
			</Suspense>
		</div>
	)
}

export default OrdersPage
