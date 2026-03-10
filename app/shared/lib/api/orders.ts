import prisma from '../prisma'

export async function getOrderById(id: number) {
	const order = await prisma.order.findUnique({
		where: { id },
		include: {
			items: {
				include: {
					product: true,
				},
			},
		},
	})
	return order
}

export async function getOrdersByUserId(userId: number) {
	const orders = await prisma.order.findMany({
		where: { userId },
		orderBy: { createdAt: 'desc' },
		include: {
			items: {
				include: {
					product: true,
				},
			},
		},
	})

	return orders
}
