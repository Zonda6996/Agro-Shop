import prisma from '@/shared/lib/prisma'
import { NextResponse } from 'next/server'

type OrderItemRequestBody = {
	orderId: number
	productId: number
	quantity: number
}

// GET /api/order-items
export async function GET() {
	const orderItems = await prisma.orderItem.findMany({
		include: { order: true },
	})

	return NextResponse.json(orderItems)
}

// POST /api/order-items
export async function POST(request: Request) {
	try {
		const body = (await request.json()) as OrderItemRequestBody

		const orderExists = await prisma.order.findUnique({
			where: { id: body.orderId },
		})

		const product = await prisma.product.findUnique({
			where: { id: body.productId },
		})

		if (!orderExists || !product) {
			return NextResponse.json(
				{ message: 'Invalid orderId or productId' },
				{ status: 400 },
			)
		}

		const newOrderItem = await prisma.orderItem.create({
			data: {
				orderId: body.orderId,
				productId: body.productId,
				quantity: body.quantity,
				price: product.price,
			},
		})

		const items = await prisma.orderItem.findMany({
			where: { orderId: body.orderId },
		})

		const total = items.reduce(
			(sum, item) => sum + Number(item.price) * item.quantity,
			0,
		)

		await prisma.order.update({
			where: { id: body.orderId },
			data: { total },
		})

		return NextResponse.json(newOrderItem, { status: 201 })
	} catch (error) {
		console.error('Error creating order item:', error)
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 },
		)
	}
}
