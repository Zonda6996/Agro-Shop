import prisma from '@/shared/lib/prisma'
import { NextResponse } from 'next/server'

type ProductRequestBody = {
	name: string
	price: number
	categoryId: number
	stock: number
	description?: string
	image?: string
}

type Params = {
	params: Promise<{ id: string }>
}

// GET /api/products/[id]
export async function GET(request: Request, { params }: Params) {
	const { id } = await params

	const product = await prisma.product.findUnique({
		where: { id: Number(id) },
		include: { category: true },
	})
	return NextResponse.json(product)
}

// PUT /api/products/[id]
export async function PUT(request: Request, { params }: Params) {
	try {
		const { id } = await params

		const body = (await request.json()) as ProductRequestBody

		if (!body.name) {
			return NextResponse.json(
				{ message: 'All fields are required' },
				{ status: 400 },
			)
		}

		const updatedProduct = await prisma.product.update({
			where: { id: Number(id) },
			data: {
				...body,
			},
		})

		return NextResponse.json(updatedProduct, { status: 200 })
	} catch (error) {
		console.error('Error updating product:', error)
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 },
		)
	}
}

// DELETE /api/products/[id]
export async function DELETE(request: Request, { params }: Params) {
	try {
		const { id } = await params

		const productInOrder = await prisma.orderItem.count({
			where: { productId: Number(id) },
		})

		if (productInOrder > 0) {
			return NextResponse.json(
				{ message: 'Cannot delete: product is in orders' },
				{ status: 400 },
			)
		}

		await prisma.product.delete({
			where: { id: Number(id) },
		})
	} catch (error) {
		console.error('Error deleting product:', error)
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 },
		)
	}

	return NextResponse.json(
		{ message: 'Product deleted successfully' },
		{ status: 200 },
	)
}
