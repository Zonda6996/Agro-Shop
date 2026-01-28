import prisma from '@/shared/lib/prisma'
import { NextResponse } from 'next/server'

type OrderRequestBody = {
	userId: number
}

// GET /api/orders
export async function GET() {
	const orders = await prisma.order.findMany()

	return NextResponse.json(orders)
}

// POST /api/orders
export async function POST(request: Request) {
	try {
		const body = (await request.json()) as OrderRequestBody

		const userExists = await prisma.user.findUnique({
			where: { id: body.userId },
		})

		if (!userExists) {
			return NextResponse.json({ message: 'User not found' }, { status: 404 })
		}

		if (!body.userId) {
			return NextResponse.json(
				{ message: 'User ID is required' },
				{ status: 400 },
			)
		}

		const newOrder = await prisma.order.create({
			data: {
				...body,
				total: 0,
			},
		})

		return NextResponse.json(newOrder, { status: 201 })
	} catch (error) {
		console.error('Error creating order:', error)
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 },
		)
	}
}
