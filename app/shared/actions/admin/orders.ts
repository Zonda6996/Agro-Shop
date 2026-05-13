'use server'

import { auth } from '@/shared/lib/auth'
import { OrderStatus } from '../../../../generated/prisma/enums'
import prisma from '@/shared/lib/prisma'
import { revalidatePath } from 'next/cache'

async function checkAdmin() {
	const session = await auth()

	if (session?.user?.role !== 'ADMIN') {
		throw new Error('Unauthorized')
	}
}

export async function updateOrderStatusAction(id: number, status: OrderStatus) {
	await checkAdmin()

	await prisma.order.update({
		where: { id },
		data: { status },
	})

	revalidatePath('/admin/orders')
}
