'use client'

import { updateOrderStatusAction } from '@/shared/actions/admin/orders'
import { OrderStatus } from '../../../../../generated/prisma/enums'
import React, { useState } from 'react'

const statusOptions: { value: OrderStatus; label: string }[] = [
	{ value: 'PENDING', label: 'Ожидает' },
	{ value: 'PAID', label: 'Оплачен' },
	{ value: 'SHIPPED', label: 'В доставке' },
	{ value: 'DELIVERED', label: 'Доставлен' },
	{ value: 'CANCELLED', label: 'Отменён' },
]

interface Props {
	id: number
	currentStatus: OrderStatus
}

export const ChangeOrderStatus = ({ id, currentStatus }: Props) => {
	const [isPending, setIsPending] = useState(false)

	const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		setIsPending(true)
		await updateOrderStatusAction(id, e.target.value as OrderStatus)
		setIsPending(false)
	}

	return (
		<select
			defaultValue={currentStatus}
			onChange={handleChange}
			disabled={isPending}
			className='border rounded-md px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50'
		>
			{statusOptions.map(option => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	)
}
