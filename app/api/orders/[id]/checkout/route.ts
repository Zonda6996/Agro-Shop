import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

type Params = {
	params: Promise<{ id: string }>
}

export async function POST(request: Request, { params }: Params) {
	const { id } = await params
	const orderId = Number(id)

	const order = await prisma.order.findUnique({
		where: { id: orderId },
		include: { items: true },
	})

	if (!order) {
		return NextResponse.json({ message: 'Order not found' }, { status: 404 })
	}

	if (order.status !== 'PENDING') {
		return NextResponse.json(
			{ message: 'Order already processed' },
			{ status: 400 },
		)
	}

	if (order.items.length === 0) {
		return NextResponse.json({ message: 'Order has no items' }, { status: 400 })
	}

	const total = order.items.reduce(
		(sum, item) => sum + Number(item.price) * item.quantity,
		0,
	)

	const updatedOrder = await prisma.order.update({
		where: { id: orderId },
		data: {
			total,
			status: 'PAID',
		},
	})

	return NextResponse.json(updatedOrder)
}
