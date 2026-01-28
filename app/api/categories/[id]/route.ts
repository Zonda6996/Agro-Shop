import prisma from '@/shared/lib/prisma'
import { NextResponse } from 'next/server'

type CategoryRequestBody = {
	name: string
}

type Params = {
	params: Promise<{ id: string }>
}

// GET /api/categories/[id]
export async function GET(request: Request, { params }: Params) {
	const { id } = await params
	const category = await prisma.category.findUnique({
		where: { id: Number(id) },
	})
	return NextResponse.json(category)
}

// PUT /api/categories/[id]
export async function PUT(request: Request, { params }: Params) {
	try {
		const { id } = await params

		const body = (await request.json()) as CategoryRequestBody

		const updatedCategory = await prisma.category.update({
			where: { id: Number(id) },
			data: {
				...body,
			},
		})

		return NextResponse.json(updatedCategory, { status: 200 })
	} catch (error) {
		console.error('Error updating category:', error)
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 },
		)
	}
}

// DELETE /api/categories/[id]
export async function DELETE(request: Request, { params }: Params) {
	try {
		const { id } = await params

		const productsCount = await prisma.product.count({
			where: { categoryId: Number(id) },
		})

		if (productsCount > 0) {
			return NextResponse.json(
				{ message: 'Category has products and cannot be deleted' },
				{ status: 400 },
			)
		}

		await prisma.category.delete({
			where: { id: Number(id) },
		})
	} catch (error) {
		console.error('Error deleting category:', error)
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 },
		)
	}

	return NextResponse.json(
		{ message: 'Category deleted successfully' },
		{ status: 200 },
	)
}
