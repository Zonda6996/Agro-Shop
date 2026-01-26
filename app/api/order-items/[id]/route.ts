import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

type OrderItemRequestBody = {
	orderId: number
	productId: number
	quantity: number
}

type Params = {
	params: Promise<{ id: string }>
}

// GET /api/order-items/[id]
export async function GET(request: Request, { params }: Params) {
	const { id } = await params

	const orderItem = await prisma.orderItem.findUnique({
		where: { id: Number(id) },
		include: { product: true },
	})
	return NextResponse.json(orderItem)
}

// PUT /api/order-items/[id]
export async function PUT(request: Request, { params }: Params) {
	try {
		const { id } = await params

		const body = (await request.json()) as OrderItemRequestBody

		const orderItem = await prisma.orderItem.findUnique({
			where: { id: Number(id) },
			include: { order: true },
		})

		if (!orderItem) {
			return NextResponse.json(
				{ message: 'Order item not found' },
				{ status: 404 },
			)
		}

		if (orderItem.order.status !== 'PENDING') {
			return NextResponse.json(
				{ message: 'Cannot update item of a processed order' },
				{ status: 400 },
			)
		}

		const updatedOrderItem = await prisma.orderItem.update({
			where: { id: orderItem.id },
			data: { quantity: body.quantity },
		})

		const items = await prisma.orderItem.findMany({
			where: { orderId: orderItem.orderId },
		})

		const total = items.reduce(
			(sum, item) => sum + Number(item.price) * item.quantity,
			0,
		)

		await prisma.order.update({
			where: { id: orderItem.orderId },
			data: { total },
		})

		return NextResponse.json(updatedOrderItem, { status: 200 })
	} catch (error) {
		console.error('Error updating order item:', error)
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 },
		)
	}
}

// DELETE /api/order-items/[id]
export async function DELETE(request: Request, { params }: Params) {
	try {
		const { id } = await params

		const orderItem = await prisma.orderItem.findUnique({
			where: { id: Number(id) },
			include: { order: true },
		})

		if (!orderItem) {
			return NextResponse.json(
				{ message: 'Order item not found' },
				{ status: 404 },
			)
		}

		if (orderItem.order.status !== 'PENDING') {
			return NextResponse.json(
				{ message: 'Cannot delete item of a processed order' },
				{ status: 400 },
			)
		}

		await prisma.orderItem.delete({
			where: { id: Number(id) },
		})

		const items = await prisma.orderItem.findMany({
			where: { orderId: orderItem.orderId },
		})

		const total = items.reduce(
			(sum, item) => sum + Number(item.price) * item.quantity,
			0,
		)

		await prisma.order.update({
			where: { id: orderItem.orderId },
			data: { total },
		})
	} catch (error) {
		console.error('Error deleting order item:', error)
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 },
		)
	}

	return NextResponse.json(
		{ message: 'Order item deleted successfully' },
		{ status: 200 },
	)
}
