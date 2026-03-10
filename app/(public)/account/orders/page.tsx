import { auth } from '@/shared/lib/auth'
import { OrderStatus } from '../../../../generated/prisma/enums'
import { getOrdersByUserId } from '@/shared/lib/api/orders'
import { PackageIcon } from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from '@/shared/lib/routes'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { formatPrice } from '@/shared/lib/utils'
import { Separator } from '@/shared/ui/separator'

const statusLabels: Record<OrderStatus, string> = {
	PENDING: 'Ожидает подтверждения',
	PAID: 'Оплачен',
	SHIPPED: 'В доставке',
	DELIVERED: 'Доставлен',
	CANCELLED: 'Отменён',
}

const statusColors: Record<OrderStatus, string> = {
	PENDING: 'text-yellow-600 bg-yellow-50',
	PAID: 'text-blue-600 bg-blue-50',
	SHIPPED: 'text-purple-600 bg-purple-50',
	DELIVERED: 'text-green-600 bg-green-50',
	CANCELLED: 'text-red-600 bg-red-50',
}

const OrdersPage = async () => {
	const session = await auth()
	const orders = await getOrdersByUserId(Number(session?.user.id))

	if (!orders.length) {
		return (
			<div className='flex flex-col items-center gap-4 py-20 text-center'>
				<PackageIcon className='w-12 h-12 text-gray-300' />
				<div>
					<p className='font-semibold'>У вас пока нет заказов</p>
					<p className='text-gray-500 text-sm mt-1'>
						Перейдите в каталог чтобы сделать первый заказ
					</p>
				</div>
				<Link href={ROUTES.PRODUCTS}>
					<Button variant='outline'>Перейти в каталог</Button>
				</Link>
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-4'>
			<h2 className='text-lg font-semibold heading'>Мои заказы</h2>
			{orders.map(order => (
				<Card key={order.id}>
					<CardContent className='flex flex-col gap-4'>
						{/* Шапка заказа */}
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-3'>
								<p className='font-semibold'>Заказ №{order.id}</p>
								<span
									className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[order.status]}`}
								>
									{statusLabels[order.status]}
								</span>
							</div>
							<p className='text-sm text-gray-500'>
								{new Date(order.createdAt).toLocaleDateString('ru-RU', {
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})}
							</p>
						</div>

						{/* Товары */}
						<div className='flex flex-col gap-2'>
							{order.items.map(item => (
								<div key={item.id} className='flex justify-between text-sm'>
									<span className='text-gray-600'>
										{item.product.name} × {item.quantity}
									</span>
									<span className='font-medium'>
										{formatPrice(Number(item.price) * item.quantity)} ₸
									</span>
								</div>
							))}
						</div>
						<Separator className='bg-gray-200' />

						{/* Итого и кнопка */}
						<div className='flex items-center justify-between'>
							<p className='font-semibold'>
								Итого: {formatPrice(Number(order.total))} ₸
							</p>
							<Link href={ROUTES.ORDER(order.id)}>
								<Button variant='outline' size='sm'>
									Подробнее
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}

export default OrdersPage
