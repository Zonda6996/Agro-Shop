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
