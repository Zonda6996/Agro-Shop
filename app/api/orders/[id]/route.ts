import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { OrderStatus } from '../../../../generated/prisma/enums'

type OrderRequestBody = {
	userId: number
	total?: number // temporary (will calculate later)
	status?: OrderStatus
}

type Params = {
	params: Promise<{ id: string }>
}

// GET /api/orders/[id]
export async function GET(request: Request, { params }: Params) {
	const { id } = await params

	const order = await prisma.order.findUnique({
		where: { id: Number(id) },
		include: { items: { include: { product: true } } },
	})
	return NextResponse.json(order)
}

// PUT /api/orders/[id]
export async function PUT(request: Request, { params }: Params) {
	try {
		const { id } = await params

		const body = (await request.json()) as OrderRequestBody

		const updatedOrder = await prisma.order.update({
			where: { id: Number(id) },
			data: {
				status: body.status,
				total: body.total,
			},
		})

		return NextResponse.json(updatedOrder, { status: 200 })
	} catch (error) {
		console.error('Error updating order:', error)
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 },
		)
	}
}

// DELETE /api/orders/[id]
export async function DELETE(request: Request, { params }: Params) {
	try {
		const { id } = await params

		const order = await prisma.order.findUnique({
			where: { id: Number(id) },
		})

		if (!order) {
			return NextResponse.json({ message: 'Order not found' }, { status: 404 })
		}

		if (order.status !== 'PENDING') {
			return NextResponse.json(
				{ message: 'Only pending orders can be deleted' },
				{ status: 400 },
			)
		}

		await prisma.order.delete({
			where: { id: Number(id) },
		})
	} catch (error) {
		console.error('Error deleting order:', error)
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 },
		)
	}

	return NextResponse.json(
		{ message: 'Order deleted successfully' },
		{ status: 200 },
	)
}
