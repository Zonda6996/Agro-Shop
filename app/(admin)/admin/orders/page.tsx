import React from 'react'
import { OrderStatus } from '../../../../generated/prisma/enums'
import prisma from '@/shared/lib/prisma'
import { formatPrice } from '@/shared/lib/utils'
import { ChangeOrderStatus } from './components/ChangeOrderStatus'

const statusLabels: Record<OrderStatus, string> = {
	PENDING: 'Ожидает',
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

export default async function AdminOrdersPage() {
	const orders = await prisma.order.findMany({
		orderBy: { createdAt: 'desc' },
		include: {
			items: { include: { product: true } },
			user: { select: { name: true, email: true } },
		},
	})

	return (
		<div>
			<h1 className='text-2xl font-bold mb-8'>Заказы</h1>

			<div className='flex flex-col gap-4'>
				{orders.map(order => (
					<div key={order.id} className='bg-white rounded-xl p-6 shadow-sm'>
						<div className='flex items-start justify-between gap-4 mb-4'>
							<div>
								<p className='font-semibold'>Заказ №{order.id}</p>
								<p className='text-sm text-gray-500 mt-1'>
									{order.user.name} · {order.user.email}
								</p>
								<p className='text-sm text-gray-500'>
									{new Date(order.createdAt).toLocaleDateString('ru-RU', {
										day: 'numeric',
										month: 'long',
										year: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
									})}
								</p>
							</div>
							<div className='flex items-center gap-3'>
								<span
									className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[order.status]}`}
								>
									{statusLabels[order.status]}
								</span>
								<ChangeOrderStatus id={order.id} currentStatus={order.status} />
							</div>
						</div>

						<div className='flex flex-col gap-2 border-t pt-4'>
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

						<div className='flex justify-between items-center border-t mt-4 pt-4'>
							<div className='text-sm text-gray-500'>
								<span>
									{order.deliveryMethod === 'PICKUP' ? 'Самовывоз' : 'Доставка'}
								</span>
								<span className='mx-2'>·</span>
								<span>{order.phone}</span>
								{order.address && (
									<>
										<span className='mx-2'>·</span>
										<span>{order.address}</span>
									</>
								)}
							</div>
							<p className='font-semibold'>
								Итого: {formatPrice(Number(order.total))} ₸
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
